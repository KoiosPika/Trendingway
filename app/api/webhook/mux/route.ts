import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createVideoProfileReview, createVideoReview } from '@/lib/actions/review.actions';

export async function POST(request: Request) {
    const body = await request.text();
    const signatureHeader = request.headers.get('mux-signature');

    if (!signatureHeader) {
        return NextResponse.json({ message: 'Signature header missing' }, { status: 400 });
    }

    const muxWebhookSecret = process.env.MUX_WEBHOOK_SECRET!;
    const [timestampPart, signaturePart] = signatureHeader.split(',');
    const timestamp = timestampPart.split('=')[1];
    const signature = signaturePart.split('=')[1];

    const payload = `${timestamp}.${body}`;
    const expectedSignature = createHmac('sha256', muxWebhookSecret)
        .update(payload)
        .digest('hex');

    if (signature !== expectedSignature) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 403 });
    }

    let event;

    try {
        event = JSON.parse(body);
    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err }, { status: 400 });
    }

    // Handle the event
    const eventType = event.type;

    if (eventType === 'video.asset.created') {
        const { id: assetId, passthrough } = event.data;
        const metadata = JSON.parse(passthrough);

        const { request, user, reviewer, type } = metadata;

        const review = {
            request,
            User: user,
            Reviewer: reviewer,
            videoURL: assetId
        }

        if (type === 'VideoReview') {
            await createVideoReview(review)
        } else if (type === 'VideoProfileReview'){
            await createVideoProfileReview(review)
        }

        return NextResponse.json({ message: 'OK', assetId });
    }

    return new Response('', { status: 200 });
}