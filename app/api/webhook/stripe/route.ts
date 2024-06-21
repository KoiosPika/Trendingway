import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import UserData from '@/lib/database/models/userData.model'
import { connectToDatabase } from '@/lib/database'
import Transfer from '@/lib/database/models/transfer.model'

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
  });

  // CREATE
  if (eventType === 'checkout.session.completed') {

    const { id, amount_total, payment_intent, metadata, customer_details } = event.data.object

    try {

      const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent as string)

      const charge_id = paymentIntent.latest_charge?.toString()

      if (customer_details?.address?.country != 'US') {

        await stripe.refunds.create({ charge: charge_id })

      } else {

        const charge = await stripe.charges.retrieve(charge_id as string)

        if (charge.payment_method_details?.card?.country != 'US') {

          await stripe.refunds.create({ charge: charge_id })

        } else {

          const order = {
            stripeId: id,
            User: metadata?.buyerId || '',
            amount: amount_total! / 100 || 0,
            createdAt: new Date(),
          }

          await connectToDatabase();

          const newOrder = await createOrder(order)
        }

      }

      return NextResponse.json({ message: 'OK' })
    } catch (error) {
      console.log(error);
    }

    return new Response('', { status: 200 })
  }
}