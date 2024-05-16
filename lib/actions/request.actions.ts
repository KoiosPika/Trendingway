'use server'

import { connectToDatabase } from "../database"
import Request from "../database/models/request.model"
import User from "../database/models/user.model"

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Reviewer', model: User, select: "_id photo username" })
}

export async function createRequest({ User, Reviewer, postLink, description, platform, price }: { User: string, Reviewer: string, postLink: string, description: string, platform: string, price: number }) {
    try {
        await connectToDatabase()

        const request = await Request.create({ User, Reviewer, postLink, description, platform, reviewed: false, price })

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

export async function getAllRequests(userId: string) {
    try {
        await connectToDatabase();

        const requests = await populateRequest(Request.find({ Reviewer: userId, reviewed: false }))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}