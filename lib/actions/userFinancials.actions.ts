'use server'

import { ClientSession } from "mongoose";
import { connectToDatabase } from "../database"
import UserData from "../database/models/userData.model";
import UserFinancials from "../database/models/userFinancials.model";
import Status from "../database/models/status.model";
import Stripe from "stripe";
import Order from "../database/models/order.model";

export async function getUserFinancials(userId: string) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {
        await connectToDatabase();

        const now = new Date();

        const userFinancials = await UserFinancials.findOne({ User: userId })

        let points = userFinancials.points;

        if (points > 0 && userFinancials.lastRechargeDate < now) {
            await UserFinancials.findByIdAndUpdate(userFinancials._id, { '$set': { points: 0 } })

            await stripe.transfers.create({
                amount: Math.round(points / 10),
                currency: 'usd',
                destination: (process.env.STRIPE_FEE_ACCOUNT as string),
            })
        }

        return JSON.parse(JSON.stringify(userFinancials))
    } catch (error) {
        console.log(error)
    }
}

export async function redeemPoints(userId: string) {

    let session: ClientSession | null = null;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {
        const db = await connectToDatabase()

        const status = await Status.findOneAndUpdate(
            { User: userId, processing: false },
            { $set: { processing: true } },
            { new: true }
        );

        if (!status) {
            return false;
        }

        session = await db.startSession();
        session.startTransaction();

        const userFinancials = await UserFinancials.findOne({ User: userId }).session(session)

        const pointsToRedeem = Math.floor(userFinancials.points / 1000) * 1000;

        let amount = pointsToRedeem / 1000;

        await UserFinancials.findByIdAndUpdate(userFinancials._id, { '$inc': { creditBalance: amount, points: -1 * pointsToRedeem } }, { session })

        await Order.create([{
            User: userId,
            amount,
            type: "redeem",
        }], { session })

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        return amount;

    } catch (error) {
        console.log(error);

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        await Status.findOneAndUpdate({ User: userId }, { '$set': { processing: false } })

        return false;
    }
}

export async function createCurrentRequests() {
    try {
        await connectToDatabase();

        await UserFinancials.updateMany(
            {},
            { '$set': { "currentRequests": 0 } }
        )
    } catch (error) {
        console.log(error);
    }
}