'use server'

import { connectToDatabase } from "../database"
import Earning, { IEarning } from "../database/models/earning.model";
import Request from "../database/models/request.model";
import UserData from "../database/models/userData.model";
import Stripe from "stripe";
import Transfer from "../database/models/transfer.model";
import { ClientSession } from "mongoose";
import Status from "../database/models/status.model";
import UserFinancials from "../database/models/userFinancials.model";

export async function createEarning(requestId: any, session: ClientSession) {

    const today = new Date();
    const dayOfWeek = today.getDay();

    let daysToAdd;
    switch (dayOfWeek) {
        case 0: // Sunday
            daysToAdd = 3; // Payment processed on Monday, available on Wednesday
            break;
        case 1: // Monday
            daysToAdd = 2; // Payment processed on Monday, available on Wednesday
            break;
        case 2: // Tuesday
            daysToAdd = 2; // Payment processed on Tuesday, available on Thursday
            break;
        case 3: // Wednesday
            daysToAdd = 2; // Payment processed on Wednesday, available on Friday
            break;
        case 4: // Thursday
            daysToAdd = 4; // Payment processed on Thursday, available next Monday
            break;
        case 5: // Friday
            daysToAdd = 4; // Payment processed on Friday, available next Tuesday
            break;
        case 6: // Saturday
            daysToAdd = 3; // Payment processed on Monday, available on Wednesday
            break;
        default:
            daysToAdd = 2; // Default case to cover unexpected values
            break;
    }

    daysToAdd++;

    today.setDate(today.getDate() + daysToAdd);

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
            amount: Number((request.price * 0.87).toFixed(2)),
            fee: Number((request.price * 0.13).toFixed(2)),
            service: request.type,
            availableDate: today
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
            fee: 0,
            orderCount: 0
        }));

        orders.forEach(order => {
            const monthIndex = new Date(order.createdAt).getMonth();
            groupedOrders[monthIndex].total += order.amount;
            groupedOrders[monthIndex].fee += order.fee;
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

        const User = await UserFinancials.findOne({ User: userId }).session(session);

        const deducteStripeFee = new Date(User.transferDate) < now;

        if (deducteStripeFee) {
            await UserFinancials.findByIdAndUpdate(User._id, { '$set': { transferDate: nextMonth } }, { session });
        }

        const updatePromises = earnings.map((earning) =>
            Earning.findByIdAndUpdate(earning._id, { withdrawn: true }, { session })
        );

        await Promise.all(updatePromises);

        let fee = (availableEarning * 0.055) + 0.75

        fee = Math.round(fee * 100)

        let total_fee = deducteStripeFee ? fee + 200 : fee;

        availableEarning = Math.round(availableEarning * 100) - total_fee

        const transfer = await stripe.transfers.create({
            amount: availableEarning,
            currency: 'usd',
            destination: User?.expressAccountID,
        });

        let transferedFee = fee - Math.round(availableEarning * 0.0025 + 25)

        const feeTransfer = await stripe.transfers.create({
            amount: transferedFee,
            currency: 'usd',
            destination: (process.env.STRIPE_FEE_ACCOUNT as string),
        });

        await session.commitTransaction();
        session.endSession();

        await Transfer.create({
            User: userId,
            transferId: transfer.id,
            amount: transfer.amount / 100,
            fee: fee / 100,
            monthlyDeductible: deducteStripeFee
        })

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        return true;

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