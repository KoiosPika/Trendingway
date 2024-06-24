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

        await UserData.findOneAndUpdate(
            { "User": order.User },
            { '$inc': { "creditBalance": order.amount } },
        )

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        console.log(error);
    }
}

export const checkoutOrder = async (order: { amount: number, User: string }) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

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
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
            automatic_tax: { 'enabled': true },
            billing_address_collection: 'required',
            payment_intent_data: {
                application_fee_amount: order.amount * 100 * 0.22,
                transfer_data: {
                    destination: (process.env.STRIPE_FEE_ACCOUNT as string)
                }
            }
        });

        redirect(session.url!)
    } catch (error) {
        throw error;
    }
}

export async function getAllOrders(userId: string) {
    try {
        await connectToDatabase();

        const orders = await Order.find({
            User: userId
        }).sort({ createdAt: -1 }).limit(3)

        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedOrders(userId: string, skip: number) {
    try {
        await connectToDatabase();

        const order = await Order.find({ User: userId }).sort({ createdAt: -1 }).skip(skip).limit(9)

        return JSON.parse(JSON.stringify(order))

    } catch (error) {
        console.log(error);
    }
}

export async function getOrdersData(userId: string, year: number) {
    try {
        await connectToDatabase();

        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const orders = await Order.find({
            User: userId,
            createdAt: { $gte: start, $lt: end }
        }).sort({ createdAt: -1 });

        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
        const groupedOrders = months.map(month => ({
            month,
            total: 0,
            orderCount: 0
        }));

        orders.forEach(order => {
            const monthIndex = new Date(order.createdAt).getMonth();
            groupedOrders[monthIndex].total += order.amount;
            groupedOrders[monthIndex].orderCount += 1;
        });

        return JSON.parse(JSON.stringify(groupedOrders));

    } catch (error) {
        console.log(error)
    }
}