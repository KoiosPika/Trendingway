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

export async function getPaginatedEarnings(userId:string, skip:number){
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 }).skip(skip).limit(3)

        return JSON.parse(JSON.stringify(earnings))

    } catch (error) {
        console.log(error);
    }
}