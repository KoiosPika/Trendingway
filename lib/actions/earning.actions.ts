'use server'

import { connectToDatabase } from "../database"
import Earning, { IEarning } from "../database/models/earning.model";
import Request from "../database/models/request.model";
import UserData from "../database/models/userData.model";
import Stripe from "stripe";
import Transfer from "../database/models/transfer.model";
import { ClientSession } from "mongoose";

export async function createEarning(requestId: any, session: ClientSession) {
    try {

        await connectToDatabase();

        const request = await Request.findById(requestId).session(session);

        await UserData.findOneAndUpdate(
            { User: request.Insighter },
            {
                '$inc': {
                    nofVideoesInsighted: 1
                }
            },
            { session }
        )

        await Earning.create([{
            User: request.Insighter,
            amount: Number((request.price * 0.8).toFixed(2)),
            service: request.type
        }], { session })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllEarnings(userId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).limit(3).sort({ createdAt: -1 })

        return JSON.parse(JSON.stringify(earnings))
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedEarnings(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 })

        let startIndex = earnings.findIndex((earning: IEarning) => earning._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedEarnings = earnings.slice(startIndex, startIndex + 9);

        return JSON.parse(JSON.stringify(paginatedEarnings))

    } catch (error) {
        console.log(error);
    }
}

export async function getEarningsData(userId: string, year: number) {
    try {
        await connectToDatabase();

        const start = new Date(year, 0, 1);
        const end = new Date(year + 1, 0, 1);

        const orders = await Earning.find({
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

export async function getAvailableEarnings(userId: string) {
    try {
        await connectToDatabase();

        const now = new Date();

        const earnings = await Earning.find({ User: userId, withdrawn: false, availableDate: { '$lt': now } });

        let availableEarning = 0;
        let availableInsights = 0;

        if (earnings) {
            earnings.forEach((earning: IEarning) => {
                availableEarning = availableEarning + earning.amount;
                availableInsights++;
            })
        }

        const data = {
            availableEarning,
            availableInsights
        }

        return data;

    } catch (error) {
        console.log(error);
    }
}

export async function getEarningsAsPayouts(userId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 }).limit(10)

        return JSON.parse(JSON.stringify(earnings));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedEarningsAsPayouts(userId: string, page: number) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 }).limit(10).skip(page)

        return JSON.parse(JSON.stringify(earnings));
    } catch (error) {
        console.log(error)
    }
}

export async function createTransfer(userId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        const now = new Date();

        const nextMonth = new Date();

        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const earnings = await Earning.find({ User: userId, withdrawn: false, availableDate: { '$lt': now } }).limit(150).session(session);

        let availableEarning = 0;

        if (earnings) {
            earnings.forEach((earning: IEarning) => {
                availableEarning = availableEarning + earning.amount;
            })
        }

        if (earnings.length < 10) {
            throw Error;
        }

        const User = await UserData.findOne({ User: userId }).session(session);

        const deducteStripeFee = new Date(User.transferDate) < now;

        if (deducteStripeFee) {
            availableEarning = availableEarning - 2;
            await UserData.findByIdAndUpdate(User._id, { '$set': { transferDate: nextMonth } }, { session });
        }

        const updatePromises = earnings.map((earning) =>
            Earning.findByIdAndUpdate(earning._id, { withdrawn: true }, { session })
        );

        await Promise.all(updatePromises);

        availableEarning = Math.round(availableEarning * 100)

        const transfer = await stripe.transfers.create({
            amount: availableEarning,
            currency: 'usd',
            destination: User?.expressAccountID,
        });

        await session.commitTransaction();
        session.endSession();

        await Transfer.create({
            User: userId,
            transferId: transfer.id,
            amount: transfer.amount / 100,
            monthlyDeductible: deducteStripeFee
        })

        return true;


    } catch (error) {

        console.log(error);

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        return false;
    }
}