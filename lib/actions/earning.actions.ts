'use server'

import { connectToDatabase } from "../database"
import Earning, { IEarning } from "../database/models/earning.model";
import Request from "../database/models/request.model";
import Review from "../database/models/review.model";
import UserData from "../database/models/userData.model";

const populateReview = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "_id type price" })
}

export async function createEarning(reviewId: string) {
    try {

        const review = await populateReview(Review.findById(reviewId));

        await Review.findOneAndUpdate(
            { _id: reviewId },
            { '$set': { insightful: 'True' } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            {
                '$inc': {
                    withdrawBalance: review.Request.price * 0.8,
                    nofVideoesReviewed: 1
                }
            }
        )

        await Request.findOneAndUpdate(
            { _id: review?.Request?._id },
            { '$set': { status: 'Completed' } }
        )

        await Earning.create({
            User: review.Reviewer,
            amount: review.Request.price * 0.8,
            service: review.Request.type
        })

    } catch (error) {
        console.log(error);
    }
}

export async function getAllEarnings(userId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).limit(3).sort({ createdAt: -1 })

        return JSON.parse(JSON.stringify(earnings))
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedEarnings(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const earnings = await Earning.find({ User: userId }).sort({ createdAt: -1 })

        let startIndex = earnings.findIndex((earning: IEarning) => earning._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedEarnings = earnings.slice(startIndex, startIndex + 9);

        return JSON.parse(JSON.stringify(paginatedEarnings))

    } catch (error) {
        console.log(error);
    }
}