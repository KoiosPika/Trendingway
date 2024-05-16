'use server'

import Stripe from "stripe";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import UserData from "../database/models/userData.model";
import { redirect } from "next/navigation";

export const createOrder = async (order: { User: string, amount: number, createdAt: Date, stripeId: string }) => {

    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order,
            buyer: order.User,
        });

        const ticketValue: { [key: string]: number } = {
            '1.99': 8,
            '3.99': 15,
            '6.99': 26,
            '9.99': 40
        };


        const user = await UserData.findOne({ User: order.User });

        await UserData.updateOne(
            { User: order.User },
            { $set: { creditBalance: order.amount } }
        )

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        console.log(error);
    }
}

export const checkoutOrder = async (order: { amount: number, User: string }) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: order.amount * 100,
                        product_data: {
                            name: 'Recharge'
                        }
                    },
                    quantity: 1
                },
            ],
            metadata: {
                buyerId: order.User,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/tickets`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!)
    } catch (error) {
        throw error;
    }
}