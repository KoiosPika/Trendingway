'use server'

import { connectToDatabase } from "../database"
import Chat from "../database/models/chat.model";
import Request from "../database/models/request.model";
import User from "../database/models/user.model";

const populateChat = (query: any) => {
    return query
        .populate({ path: 'User1', model: User, select: "_id photo username" })
        .populate({ path: 'User2', model: User, select: "_id photo username" })
}

export async function getChatByRequestID(id: string) {
    try {
        await connectToDatabase();

        const request = await Request.findById(id)

        const chat = await populateChat(Chat.findById(request.chatId))

        const thisChat = { ...chat.toObject(), type: request.type }

        return JSON.parse(JSON.stringify(thisChat));
    } catch (error) {
        console.log(error)
    }
}

export async function getChatByID(id:string){
    try {
        await connectToDatabase();

        const chat = await populateChat(Chat.findById(id));

        return JSON.parse(JSON.stringify(chat));
    } catch (error) {
        console.log(error)
    }
}