'use server'

import { ServerClient } from "postmark";
import { connectToDatabase } from "../database"
import Refund, { IRefund } from "../database/models/refund.model";
import Request from "../database/models/request.model";
import Insight from "../database/models/insight.model";
import User from "../database/models/user.model";
import UserData from "../database/models/userData.model";

const populateInsight = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Insighter postLink description platform type price" })
        .populate({ path: 'User', model: User, select: "username photo" })
        .populate({ path: 'Insighter', model: User, select: "username photo" })
}

export async function getAllRefunds(userId: string) {
    try {
        await connectToDatabase();

        const refunds = await Refund.find({ User: userId }).sort({ createdAt: -1 }).limit(3);

        return JSON.parse(JSON.stringify(refunds))

    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedRefunds(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const refunds = await Refund.find({ User: userId }).sort({ createdAt: -1 })

        let startIndex = refunds.findIndex((refund: IRefund) => refund._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedRefunds = refunds.slice(startIndex, startIndex + 9);

        return JSON.parse(JSON.stringify(paginatedRefunds));

    } catch (error) {
        console.log(error)
    }
}