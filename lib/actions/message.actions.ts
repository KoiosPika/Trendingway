'use server'

import { connectToDatabase } from "../database"
import Message from "../database/models/message.model";
import Request from "../database/models/request.model";
import User from "../database/models/user.model";

const populateMessages = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
}

export async function getMessagesByRequestID(id: string) {
    try {

        await connectToDatabase();

        const request = await Request.findById(id)

        const messages = await populateMessages(Message.find({ Chat: request.chatId }).sort({createdAt:-1}).limit(5))

        return JSON.parse(JSON.stringify(messages))
    } catch (error) {
        console.log(error)
    }
}