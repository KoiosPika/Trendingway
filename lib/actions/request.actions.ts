'use server'

import { ServerClient } from "postmark"
import { connectToDatabase } from "../database"
import Refund from "../database/models/refund.model"
import Request, { IRequest } from "../database/models/request.model"
import Spending from "../database/models/spending.model"
import User from "../database/models/user.model"
import UserData from "../database/models/userData.model"
import Chat from "../database/models/chat.model"
import Message from "../database/models/message.model"
import { ClientSession } from "mongoose"
import UserFinancials from "../database/models/userFinancials.model"

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Insighter', model: User, select: "_id photo username" })
}

export async function createRequest({ User, Insighter, postLink, description, platform, price, type }: { User: string, Insighter: string, postLink: string | undefined, description: string, platform: string | undefined, price: number, type: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        const request = await Request.create([{ User, Insighter, postLink, description, platform, insighted: false, price, type }], { session })

        const user = await UserFinancials.findOneAndUpdate(
            { User },
            { '$inc': { creditBalance: (-1 * price) } },
            { session }
        )

        const spendings = await Spending.create([{
            User,
            Insighter,
            amount: price,
            service: type
        }], { session })

        const now = new Date();

        const timeDifference = now.getTime() - user.lastOrderEmail.getTime();

        const hoursDifference = timeDifference / (1000 * 60 * 60)

        if (hoursDifference >= 6) {

            const emailOptions = {
                From: 'automated@insightend.com',
                To: 'admin@insightend.com',
                Subject: 'Order Canceled',
                HtmlBody:
                    `
                    <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                    <h2 style="color: #333;">You have new orders!</h2>
                    <p style="font-size: 16px; color: #555;">Log in to your activity page to see your latest orders</p>
                    <p style="font-size: 16px; color: #555;">Customers can withdraw their requests if not answered within 5 days</p>
                    <div style="margin-top: 20px;">
                        <a href="https://www.insightend.com/activity/orders" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #EC1A0D; border-radius: 5px; text-decoration: none;">Go to Activity</a>
                    </div>
                </div>
                `,
            };

            await UserFinancials.findByIdAndUpdate(user._id, { '$set': { lastOrderEmail: now } }, { session })

            await client.sendEmail(emailOptions);
        }

        await session.commitTransaction();
        session.endSession();


        return JSON.parse(JSON.stringify(request))

    } catch (error) {

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        console.log(error)
    }
}

export async function createPersonalRequest(User: string, Insighter: string, description: string, price: number, type: string) {

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        let chat = null;

        chat = await Chat.findOne({
            $or: [
                { User1: User, User2: Insighter },
                { User1: Insighter, User2: User }
            ]
        }).session(session)

        if (!chat) {
            [chat] = await Chat.create([{ User1: User, User2: Insighter }], { session })
        }

        const message: any = await Message.create([{
            Chat: chat._id,
            User,
            type: "text",
            text: description,
        }], { session })

        const request = await Request.create([{ User, Insighter, description, insighted: false, price, type, chatId: chat._id, messageId: message._id }], { session })

        await UserFinancials.findOneAndUpdate(
            { User },
            { '$inc': { creditBalance: (-1 * price) } },
            { session }
        )

        const spendings = await Spending.create([{
            User,
            Insighter,
            amount: price,
            service: type
        }], { session })

        await session.commitTransaction();
        session.endSession();

        return JSON.parse(JSON.stringify(request))

    } catch (error) {

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        console.log(error)
    }
}

export async function getRequestById(id: string) {
    try {
        await connectToDatabase();

        const request = await populateRequest(Request.findById(id))

        return JSON.parse(JSON.stringify(request));
    } catch (error) {
        console.log(error)
    }
}

export async function getAllOrders(userId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Insighter: userId, status: 'Awaiting' }).sort({ createdAt: 1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedOrders(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Insighter: userId, status: 'Awaiting' }).sort({ createdAt: 1 }))

        let startIndex = requests.findIndex((order: IRequest) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedOrders = requests.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedOrders));
    } catch (error) {
        console.log(error)
    }
}

export async function cancelOrder(id: string, message: string) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        const request = await populateRequest(Request.findOneAndUpdate(
            { _id: id, status: 'Awaiting' },
            { '$set': { status: 'Canceled', message } },
            { session }
        ))

        if (!request) {
            throw Error;
        }

        if (request.type === 'PersonalInsight') {
            await Message.findByIdAndDelete(request.messageId, { session })
        }

        await UserFinancials.findOneAndUpdate(
            { User: request?.User },
            { '$inc': { creditBalance: request?.price } },
            { session }
        )

        await Refund.create([{
            User: request.User,
            amount: request.price
        }], { session })

        await session.commitTransaction();
        session.endSession();

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'Order Canceled',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">${request?.Insighter?.username} has canceled your order!</h2>
                <div style="margin: 20px 0;">
                    <img src="${request?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">${request?.Insighter?.username} has canceled your order, and $${(request.price).toFixed(2)} were refunded to your credit balance</p>
                <p style="font-size: 16px; color: #555;">${request?.Insighter?.username} says: ${message}</p>
                <p style="font-size: 16px; color: #555;">You can check your refunds in the Refunds section in your wallet page</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/wallet" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #EC1A0D; border-radius: 5px; text-decoration: none;">Go to Wallet</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return true;

    } catch (error) {

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

        console.log(error)
        
        return false;

    }
}

export async function getAllRequests(userId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ User: userId, status: { $in: ['Awaiting', 'Canceled'] } }).sort({ createdAt: -1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedRequests(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ User: userId, status: { $in: ['Awaiting', 'Canceled'] } }).sort({ createdAt: -1 }))

        let startIndex = requests.findIndex((order: IRequest) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedRequests = requests.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedRequests));
    } catch (error) {
        console.log(error)
    }
}

export async function getAllHistory(userId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Insighter: userId }).sort({ createdAt: -1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedHistory(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Insighter: userId }).sort({ createdAt: -1 }))

        let startIndex = requests.findIndex((order: IRequest) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedRequests = requests.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedRequests));
    } catch (error) {
        console.log(error)
    }
}