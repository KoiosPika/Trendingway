'use server'

import Stripe from "stripe";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { redirect } from "next/navigation";
import UserFinancials from "../database/models/userFinancials.model";

export const createOrder = async (order: { User: string, amount: number, createdAt: Date, stripeId: string, type:string }) => {

    let points;

    const afterTenDays = new Date();
    afterTenDays.setDate(afterTenDays.getDate() + 10);

    switch (order.amount) {
        case 2.99:
            points = 0
            break;

        case 4.99:
            points = 200
            break;

        case 7.99:
            points = 500
            break;

        case 10.99:
            points = 800
            break;

        case 15.99:
            points = 1300
            break;

        case 19.99:
            points = 1700
            break;

        default:
            break;
    }

    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order,
        });

        await UserFinancials.findOneAndUpdate(
            { "User": order.User },
            {
                '$inc': {
                    "creditBalance": order.amount,
                    "points": points
                },
                '$set': {
                    "lastRechargeDate": afterTenDays
                }
            },
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
                        unit_amount: Math.round(order.amount * 100),
                        product_data: {
                            name: 'Recharge',
                            tax_code: 'txcd_20030000'
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
        });

        redirect(session.url!)
    } catch (error) {
        throw (error);
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
            createdAt: { $gte: start, $lt: end },
            type: "recharge"
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