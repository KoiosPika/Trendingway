'use server'

import { connectToDatabase } from '@/lib/database'
import User, { IUser } from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'
import Review, { IReview } from '../database/models/review.model'
import Request from '../database/models/request.model'

export async function createReview(review: { request: string, contentNotes: string, brightnessNotes: string, descriptionNotes: string, hashtagsNotes: string, soundNotes: string, additionalNotes: string, Reviewer: string }) {
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
            { $set: { withdrawBalance: updatedRequest.price * 0.8 } }
        )

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}