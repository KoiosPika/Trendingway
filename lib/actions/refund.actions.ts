'use server'

import { connectToDatabase } from "../database"
import Refund, { IRefund } from "../database/models/refund.model";

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