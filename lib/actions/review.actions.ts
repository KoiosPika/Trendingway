'use server'

import { connectToDatabase } from '@/lib/database'
import User, { IUser } from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'
import Review, { IReview } from '../database/models/review.model'
import Request from '../database/models/request.model'

const populateReview = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Reviewer postLink description platform type" })
}

export async function createTextReview(review: { request: string, contentNotes: string, contentReview: number, brightnessNotes: string, brightnessReview: number, descriptionNotes: string, descriptionReview: number, hashtagsNotes: string, hashtagsReview: number, soundNotes: string, soundReview: number, additionalNotes: string, Reviewer: string, User: string }) {
    try {
        await connectToDatabase()

        console.log(review)

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            contentReview: review.contentReview,
            contentNotes: review.contentNotes,
            brightnessReview: review.brightnessReview,
            brightnessNotes: review.brightnessNotes,
            descriptionReview: review.descriptionReview,
            descriptionNotes: review.descriptionNotes,
            hashtagsReview: review.hashtagsReview,
            hashtagsNotes: review.hashtagsNotes,
            soundReview: review.soundReview,
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
            {
                '$inc': {
                    withdrawBalance: updatedRequest.price * 0.8,
                    nofVideoesReviewed: 1
                }
            }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoReview(review: { request: string, videoURL: string, Reviewer: string, User: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            reviewURL: review.videoURL
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            {
                '$inc': {
                    withdrawBalance: updatedRequest.price * 0.8,
                    nofVideoesReviewed: 1
                }
            }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoProfileReview(review: { request: string, videoURL: string, Reviewer: string, User: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            reviewURL: review.videoURL
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            {
                '$inc': {
                    withdrawBalance: updatedRequest.price * 0.8,
                    nofVideoesReviewed: 1
                }
            }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createTextProfileReview(review: { request: string, bioNotes: string, bioReview: number, highlightsNotes: string, highlightsReview: number, postsNotes: string, postsReview: number, additionalNotes: string, Reviewer: string, User: string }) {
    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            bioReview: review.bioReview,
            bioNotes: review.bioNotes,
            highlightsReview: review.highlightsReview,
            highlightsNotes: review.highlightsNotes,
            postsReview: review.postsReview,
            postsNotes: review.postsNotes,
            additionalNotes: review.additionalNotes
        })

        const updatedRequest = await Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { reviewed: true } }
        )

        await UserData.findOneAndUpdate(
            { User: review.Reviewer },
            {
                '$inc': {
                    withdrawBalance: updatedRequest.price * 0.8,
                    nofVideoesReviewed: 1
                }
            }
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

        const review = await populateReview(Review.findOneAndUpdate(
            { Request: id },
            { '$set': { rated: true } }
        ));

        console.log(review);

        await UserData.updateOne(
            { User: review?.Request?.Reviewer },
            [
                {
                    $set: {
                        nofReviews: { $add: ["$nofReviews", 1] },
                        avgReview: {
                            $let: {
                                vars: {
                                    totalReviews: { $add: ["$nofReviews", 1] },
                                    newTotalRating: { $add: [{ $multiply: ["$avgReview", "$nofReviews"] }, rating] }
                                },
                                in: { $divide: ["$$newTotalRating", "$$totalReviews"] }
                            }
                        }
                    }
                }
            ]
        )


    } catch (error) {
        console.log(error)
    }
}