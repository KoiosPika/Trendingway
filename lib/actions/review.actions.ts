'use server'

import { connectToDatabase } from '@/lib/database'
import User, { IUser } from '@/lib/database/models/user.model'
import UserData, { IUserData } from '../database/models/userData.model'
import Review, { IReview } from '../database/models/review.model'
import Request from '../database/models/request.model'
import Earning from '../database/models/earning.model'
import { ServerClient } from 'postmark';

const populateReview = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Reviewer postLink description platform type price" })
        .populate({ path: 'User', model: User, select: "username photo" })
        .populate({ path: 'Reviewer', model: User, select: "username photo" })
}

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Reviewer', model: User, select: "_id photo username" })
}

export async function createTextReview(review: { request: string, contentNotes: string, contentReview: number, brightnessNotes: string, brightnessReview: number, descriptionNotes: string, descriptionReview: number, hashtagsNotes: string, hashtagsReview: number, soundNotes: string, soundReview: number, additionalNotes: string, Reviewer: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

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

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { status: 'Reviewed', reviewed: true } }
        ))

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Reviewer?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Reviewer?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">From this moment, you have 72 hours to inform us if there's an issue with the response you received.</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #4299E1; border-radius: 5px; text-decoration: none;">Go to Text Review</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoReview(review: { request: string, videoURL: string, Reviewer: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            reviewURL: review.videoURL
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { status: 'Reviewed', reviewed: true } }
        ))

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Reviewer?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Reviewer?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">From this moment, you have 72 hours to inform us if there's an issue with the response you received.</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #EC1A0D; border-radius: 5px; text-decoration: none;">Go to Video Review</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoProfileReview(review: { request: string, videoURL: string, Reviewer: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newReview: IReview = await Review.create({
            Request: review.request,
            Reviewer: review.Reviewer,
            User: review.User,
            reviewURL: review.videoURL
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { status: 'Reviewed', reviewed: true } }
        ))

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Reviewer?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Reviewer?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">From this moment, you have 72 hours to inform us if there's an issue with the response you received.</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #3AA213; border-radius: 5px; text-decoration: none;">Go to Video Profile Review</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newReview))
    } catch (error) {
        console.log(error)
    }
}

export async function createTextProfileReview(review: { request: string, bioNotes: string, bioReview: number, highlightsNotes: string, highlightsReview: number, postsNotes: string, postsReview: number, additionalNotes: string, Reviewer: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

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

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: review.request },
            { $set: { status: 'Reviewed', reviewed: true } }
        ))

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Reviewer?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Reviewer?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">From this moment, you have 72 hours to inform us if there's an issue with the response you received.</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Profile Text Review</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

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

export async function getAllResponses(userId: string) {
    try {
        await connectToDatabase();

        const requests = await populateReview(Review.find({ User: userId }).sort({ createdAt: -1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedResponses(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const responses = await populateReview(Review.find({ User: userId }).sort({ createdAt: -1 }))

        let startIndex = responses.findIndex((order: IReview) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedResponses = responses.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedResponses));
    } catch (error) {
        console.log(error)
    }
}

export async function flagReview(id: string, message:string) {
    try {
        await connectToDatabase();

        const flaggedReview = await Review.findOneAndUpdate(
            { _id: id },
            { '$set': {insightful: "False", reportMessage: message} }
        )
        
    } catch (error) {
        console.log(error);
    }
}

export async function getFlaggedReviews() {
    try {
        await connectToDatabase();

        const reviews = await populateReview(Review.find({ insightful: 'False' }).sort({ createdAt: 1 }))

        return JSON.parse(JSON.stringify(reviews))

    } catch (error) {
        console.log(error);
    }
}