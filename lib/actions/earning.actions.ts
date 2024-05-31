'use server'

import { connectToDatabase } from "../database"
import Earning from "../database/models/earning.model";

export async function getAllEarnings(userId:string){
    try {
        await connectToDatabase();

        const earnings = await Earning.find({User:userId}).limit(3).sort({createdAt:-1})

        return JSON.parse(JSON.stringify(earnings))
    } catch (error) {
        console.log(error)
    }
}