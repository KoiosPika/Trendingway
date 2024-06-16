'use server'

import { connectToDatabase } from "../database"
import Session from "../database/models/session.model";

export async function getSessionByUserID(userId: string) {
    try {
        await connectToDatabase();

        const session = await Session.findOne({ User: userId })

        return JSON.parse(JSON.stringify(session))
    } catch (error) {
        console.log(error);
    }
}