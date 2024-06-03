'use server'

import { connectToDatabase } from "../database"
import Refund from "../database/models/refund.model";

export async function getAllRefunds(userId: string) {
    try {
        await connectToDatabase();

        const refunds = await Refund.find({ User: userId }).sort({ createdAt: -1 }).limit(3);

        return JSON.parse(JSON.stringify(refunds))
        
    } catch (error) {
        console.log(error)
    }
}