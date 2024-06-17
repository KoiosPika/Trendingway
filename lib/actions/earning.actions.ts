'use server'

import { connectToDatabase } from "../database"
import Earning, { IEarning } from "../database/models/earning.model";
import Request from "../database/models/request.model";
import Insight from "../database/models/insight.model";
import UserData from "../database/models/userData.model";

const populateInsight = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "_id type price" })
}

export async function createEarning(insightId: string) {
    try {

        const insight = await populateInsight(Insight.findById(insightId));

        await UserData.findOneAndUpdate(
            { User: insight.Insighter },
            {
                '$inc': {
                    withdrawBalance: insight.Request.price * 0.8,
                    nofVideoesInsighted: 1
                }
            }
        )

        await Earning.create({
            User: insight.Insighter,
            amount: insight.Request.price * 0.8,
            service: insight.Request.type
        })
    } catch (error) {
        console.log(error);
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

        let total = 0;

        if (earnings) {
            earnings.forEach((earning: IEarning) => {
                total = total + earning.amount;
            })
        }

        return total;

    } catch (error) {
        console.log(error);
    }
}

export async function getEarningsAsPayouts(userId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 }).limit(20)

        return JSON.parse(JSON.stringify(earnings));
    } catch (error) {
        console.log(error)
    }
}