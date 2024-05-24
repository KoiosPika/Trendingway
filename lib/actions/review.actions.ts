'use server'

import { connectToDatabase } from '@/lib/database'
import User, { IUser } from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'
import Review, { IReview } from '../database/models/review.model'
import Request from '../database/models/request.model'

const populateReview = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User postLink description platform type" })
}

export async function createTextReview(review: { request: string, contentNotes: string, brightnessNotes: string, descriptionNotes: string, hashtagsNotes: string, soundNotes: string, additionalNotes: string, Reviewer: string }) {
    try {
        await connectToDatabase()

        console.log(review)

        const newReview: IReview = await Review.create({
            Request: review.request,
            contentReview: 3,
            contentNotes: review.contentNotes,
            brightnessReview: 3,
            brightnessNotes: review.brightnessNotes,
            descriptionReview: 3,
            descriptionNotes: review.descriptionNotes,
            hashtagsReview: 3,
            hashtagsNotes: review.hashtagsNotes,
            soundReview: 3,
            soundNotes: review.soundNotes,
            additionalNotes: review.additionalNotes,
            overallReview: 3,
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            { '$inc': { withdrawBalance: updatedRequest.price * 0.8 } }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoReview(review: { request: string, videoURL: string, Reviewer: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            reviewURL: review.videoURL
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            { '$inc': { withdrawBalance: updatedRequest.price * 0.8 } }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoProfileReview(review: { request: string, videoURL: string, Reviewer: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            reviewURL: review.videoURL
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            { '$inc': { withdrawBalance: updatedRequest.price * 0.8 } }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createTextProfileReview(review: { request: string, bioNotes: string, highlightsNotes: string, postsNotes: string, additionalNotes: string, Reviewer: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            bioReview: 3,
            bioNotes: review.bioNotes,
            highlightsReview: 3,
            highlightsNotes: review.highlightsNotes,
            postsReview: 3,
            postsNotes: review.postsNotes,
            additionalNotes: review.additionalNotes
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            { '$inc': { withdrawBalance: updatedRequest.price * 0.8 } }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function getReviewByRequestId(id: string) {
    try {
        await connectToDatabase();

        const review = await populateReview(Review.findOne({ Request: id }))

        return JSON.parse(JSON.stringify(review))
    } catch (error) {
        console.log(error)
    }
}

export async function submitReviewRate(id: string, rating: number) {
    try {
        await connectToDatabase();

        const review = await Review.findOneAndUpdate(
            { _id: id },
            { '$set': { rated: true } }
        );

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            {
                $set: {
                    nofReviews: { $add: ["$nofReviews", 1] },
                    avgReview: {
                        $divide: [
                            { $add: [{ $multiply: ["$avgReview", "$nofReviews"] }, rating] },
                            { $add: ["$nofReviews", 1] }
                        ]
                    }
                }
            }
        )


    } catch (error) {
        console.log(error)
    }
}