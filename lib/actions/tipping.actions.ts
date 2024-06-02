'use server'

import { connectToDatabase } from "../database";
import Tipping from "../database/models/tipping.model";
import User from "../database/models/user.model";
import UserData from "../database/models/userData.model";

const populateTipping = (query: any) => {
    return query
        .populate({ path: 'Tipper', model: User, select: "photo username" })
}

export async function createTipping(userId: string, reviewerId: string, amount: number) {
    try {

        await connectToDatabase();

        const tipping = await Tipping.create({
            Tipper: userId,
            User: reviewerId,
            amount,
        })

        await UserData.findOneAndUpdate(
            { User: userId },
            { '$inc': { creditBalance: -1 * amount } }
        )

        await UserData.findOneAndUpdate(
            { User: reviewerId },
            { '$inc': { withdrawBalance: amount } }
        )

    } catch (error) {
        console.log(error);
    }
}

export async function getTippingByUserId(userId: string) {
    try {
        await connectToDatabase();

        const tips = await populateTipping(Tipping.find({ User: userId }).sort({ createdAt: -1 }).limit(3))

        console.log(tips)

        return JSON.parse(JSON.stringify(tips));

    } catch (error) {
        console.log(error)
    }
}