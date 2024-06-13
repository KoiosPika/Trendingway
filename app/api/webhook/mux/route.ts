import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createVideoProfileInsight, createVideoInsight } from '@/lib/actions/insight.actions';

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

        const { request, user, insighter, type } = metadata;

        const insight = {
            request,
            User: user,
            Insighter: insighter,
            videoID: assetId
        }

        if (type === 'VideoInsight') {
            await createVideoInsight(insight)
        } else if (type === 'VideoProfileInsight'){
            await createVideoProfileInsight(insight)
        }

        return NextResponse.json({ message: 'OK', assetId });
    }

    return new Response('', { status: 200 });
}