'use server'

import { connectToDatabase } from "../database"
import UserData from "../database/models/userData.model";
import UserFinancials from "../database/models/userFinancials.model";

export async function getUserFinancials(userId: string) {
    try {
        await connectToDatabase();

        const userFinancials = await UserFinancials.findOne({ User: userId })

        return JSON.parse(JSON.stringify(userFinancials))
    } catch (error) {
        console.log(error)
    }
}