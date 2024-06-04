'use server'

import { connectToDatabase } from "../database"
import Refund from "../database/models/refund.model"
import Request, { IRequest } from "../database/models/request.model"
import Spending from "../database/models/spending.model"
import User from "../database/models/user.model"
import UserData from "../database/models/userData.model"

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Reviewer', model: User, select: "_id photo username" })
}

export async function createRequest({ User, Reviewer, postLink, description, platform, price, type }: { User: string, Reviewer: string, postLink: string, description: string, platform: string, price: number, type: string }) {
    try {
        await connectToDatabase()

        const request = await Request.create({ User, Reviewer, postLink, description, platform, reviewed: false, price, type })

        await UserData.findOneAndUpdate(
            { User },
            { '$inc': { creditBalance: (-1 * price) } }
        )

        const spendings = await Spending.create({
            User,
            Reviewer,
            amount: price,
            service: type
        })

        return JSON.parse(JSON.stringify(request))

    } catch (error) {
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

        const requests = await populateRequest(Request.find({ Reviewer: userId, status: 'Awaiting' }).sort({ createdAt: 1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedOrders(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Reviewer: userId, status: 'Awaiting' }).sort({ createdAt: 1 }))

        let startIndex = requests.findIndex((order: IRequest) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedOrders = requests.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedOrders));
    } catch (error) {
        console.log(error)
    }
}

export async function cancelOrder(id: string, message: string) {
    try {
        await connectToDatabase();

        const request = await Request.findOneAndUpdate(
            { _id: id },
            { '$set': { status: 'Canceled', message } }
        )

        await UserData.findOneAndUpdate(
            { User: request?.User },
            { '$inc': { creditBalance: request?.price } }
        )

        await Refund.create({
            User: request.User,
            amount: request.price
        })

    } catch (error) {
        console.log(error)
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

        const requests = await populateRequest(Request.find({ Reviewer: userId }).sort({ createdAt: -1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedHistory(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Reviewer: userId }).sort({ createdAt: -1 }))

        let startIndex = requests.findIndex((order: IRequest) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedRequests = requests.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedRequests));
    } catch (error) {
        console.log(error)
    }
}