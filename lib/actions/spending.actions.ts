'use server'

import { connectToDatabase } from "../database"
import Spending from "../database/models/spending.model";

export async function getAllSpendings(userId:string){
    try {
        await connectToDatabase();

        const spendings = await Spending.find({User:userId}).sort({createdAt:-1}).limit(3)

        return JSON.parse(JSON.stringify(spendings));
    } catch (error) {
        console.log(error)
    }
}