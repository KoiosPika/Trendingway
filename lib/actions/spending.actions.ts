'use server'

import { connectToDatabase } from "../database"
import Spending, { ISpending } from "../database/models/spending.model";

export async function getAllSpendings(userId:string){
    try {
        await connectToDatabase();

        const spendings = await Spending.find({User:userId}).sort({createdAt:-1}).limit(3)

        return JSON.parse(JSON.stringify(spendings));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedSpendings(userId:string, lastOrderId:string){
    try {
        await connectToDatabase();

        const spendings = await Spending.find({ User: userId }).sort({ createdAt: -1 })

        let startIndex = spendings.findIndex((order: ISpending) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedSpendings = spendings.slice(startIndex, startIndex + 9);

        return JSON.parse(JSON.stringify(paginatedSpendings));
    } catch (error) {
        console.log(error)
    }
}