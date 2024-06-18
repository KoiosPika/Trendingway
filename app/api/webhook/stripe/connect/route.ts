import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import UserData from '@/lib/database/models/userData.model'

export async function POST(request: Request) {
    const body = await request.text()

    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })
    }

    // Get the ID and type
    const eventType = event.type


    if (eventType === 'account.updated') {
        const { id, charges_enabled } = event.data.object

        if (charges_enabled) {
            await UserData.findOneAndUpdate(
                { expressAccountID: id },
                { '$set': { onboardingCompleted: true } }
            )
        }

        return NextResponse.json({ message: 'OK' })
    }

    return new Response('', { status: 200 })
}