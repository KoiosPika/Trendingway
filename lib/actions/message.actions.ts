'use server'

import { connectToDatabase } from "../database"
import Message, { IMessage } from "../database/models/message.model";
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

        const messages = await populateMessages(Message.find({ Chat: request.chatId }).sort({createdAt:-1}).limit(7))

        return JSON.parse(JSON.stringify(messages))
    } catch (error) {
        console.log(error)
    }
}

export async function getMessagesByChatID(id: string) {
    try {

        await connectToDatabase();

        const messages = await populateMessages(Message.find({ Chat: id }).sort({createdAt:-1}).limit(7))

        return JSON.parse(JSON.stringify(messages))
    } catch (error) {
        console.log(error)
    }
}

export async function getMoreMessages(chatId:string, lastMessageId:string){
    try {
        await connectToDatabase();

        const messages = await populateMessages(Message.find({ Chat: chatId }).sort({createdAt:-1}))

        let startIndex = messages.findIndex((message: IMessage) => message._id.toString() === lastMessageId)

        startIndex += 1

        const paginatedMessages = messages.slice(startIndex, startIndex + 7);

        return JSON.parse(JSON.stringify(paginatedMessages))

    } catch (error) {
        console.log(error)
    }
}