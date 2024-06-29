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
        .populate({ path: 'User', model: User, select: "_id photo username email" })
        .populate({ path: 'Insighter', model: User, select: "_id photo username" })
}

const populateFinance = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username email" })
}

export async function createRequest({ User, Insighter, postLink, description, platform, price, type }: { User: string, Insighter: string, postLink: string | undefined, description: string, platform: string | undefined, price: number, type: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        const request = await Request.create([{ User, Insighter, postLink, description, platform, insighted: false, price, type }], { session })

        const user = await populateFinance(UserFinancials.findOneAndUpdate(
            { User },
            { '$inc': { creditBalance: (-1 * price) } },
            { session }
        ))

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
                To: `${user.User.email}`,
                Subject: 'Order Canceled',
                HtmlBody:
                    `
                    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <tr style="background-color: #FFF; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <td>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 10px; text-align: left;">
                            <img src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJpVVN2a2hxcjFFQ2c5ZWFnSTQ2MEhrOEE2YSJ9"
                                alt="Coin"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                    </tr>
                </table>
                <h3 style="color: #333;">You have new requests!</h3>
                <h3 style="color: #333;">Log in to your activity dashboard to see the newest requests you received!</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/insights"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #ffcf00; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Activity</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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
            To: `${request.User.email}`,
            Subject: 'Order Canceled',
            HtmlBody:
                `
                <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <tr style="background-color: #FFF; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <td>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 10px; text-align: left;">
                            <img src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJpVVN2a2hxcjFFQ2c5ZWFnSTQ2MEhrOEE2YSJ9"
                                alt="Coin"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                    </tr>
                </table>
                <h3 style="color: #333;">${request.Insighter.username} has canceled your request!</h3>
                <h3 style="color: #333;">Your request price of $${request.price} was refunded back to your balance</h3>
                <h3 style="color: #333;">Log in to your activity dashboard to see why they canceled your request</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/requests"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #ffcf00; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Activity</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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