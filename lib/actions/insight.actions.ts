'use server'

import { connectToDatabase } from '@/lib/database'
import User, { IUser } from '@/lib/database/models/user.model'
import UserData, { IUserData } from '../database/models/userData.model'
import Insight, { IInsight } from '../database/models/insight.model'
import Request from '../database/models/request.model'
import Earning from '../database/models/earning.model'
import { ServerClient } from 'postmark';
import { createEarning } from './earning.actions'
import Message from '../database/models/message.model'

const populateInsight = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Insighter postLink description platform type price" })
        .populate({ path: 'User', model: User, select: "_id username photo" })
        .populate({ path: 'Insighter', model: User, select: "_id username photo" })
}

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Insighter', model: User, select: "_id photo username" })
}

export async function createTextInsight(insight: { request: string, contentNotes: string, contentRate: number, brightnessNotes: string, brightnessRate: number, descriptionNotes: string, descriptionRate: number, hashtagsNotes: string, hashtagsRate: number, soundNotes: string, soundRate: number, additionalNotes: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newInsight: IInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            contentRate: insight.contentRate,
            contentNotes: insight.contentNotes,
            brightnessRate: insight.brightnessRate,
            brightnessNotes: insight.brightnessNotes,
            descriptionRate: insight.descriptionRate,
            descriptionNotes: insight.descriptionNotes,
            hashtagsRate: insight.hashtagsRate,
            hashtagsNotes: insight.hashtagsNotes,
            soundRate: insight.soundRate,
            soundNotes: insight.soundNotes,
            additionalNotes: insight.additionalNotes,
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #4299E1; border-radius: 5px; text-decoration: none;">Go to Text Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newInsight))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoInsight(insight: { request: string, videoID: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newInsight: IInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            insightID: insight.videoID
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #EC1A0D; border-radius: 5px; text-decoration: none;">Go to Video Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newInsight))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoProfileInsight(insight: { request: string, videoID: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newInsight: IInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            insightID: insight.videoID
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new response by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #3AA213; border-radius: 5px; text-decoration: none;">Go to Video Profile Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newInsight))
    } catch (error) {
        console.log(error)
    }
}

export async function createTextProfileInsight(insight: { request: string, bioNotes: string, bioRate: number, highlightsNotes: string, highlightsRate: number, postsNotes: string, postsRate: number, additionalNotes: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase()

        const newInsight: IInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            bioRate: insight.bioRate,
            bioNotes: insight.bioNotes,
            highlightsRate: insight.highlightsRate,
            highlightsNotes: insight.highlightsNotes,
            postsRate: insight.postsRate,
            postsNotes: insight.postsNotes,
            additionalNotes: insight.additionalNotes
        })

        const updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Profile Text Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

        return JSON.parse(JSON.stringify(newInsight))
    } catch (error) {
        console.log(error)
    }
}

export async function createVideoPersonalInsight(insight: { request: string, videoID: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase();

        const req = await Request.findById(insight.request)

        const message = await Message.create({
            Chat: req.chatId,
            User: insight.Insighter,
            type: "video",
            videoID: insight.videoID
        })

        const newInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            insightful: 'Completed',
        })

        let updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Personal Text Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

    } catch (error) {
        console.log(error)
    }
}

export async function createTextPersonalInsight(insight: { request: string, text: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        await connectToDatabase();

        const req = await Request.findById(insight.request)

        const message = await Message.create({
            Chat: req.chatId,
            User: insight.Insighter,
            type: "text",
            text: insight.text
        })

        const newInsight = await Insight.create({
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            insightful: 'Completed',
        })

        let updatedRequest = await populateRequest(Request.findOneAndUpdate(
            { _id: insight.request },
            { $set: { status: 'Completed', insighted: true } }
        ))

        await createEarning(newInsight._id)

        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h2>
                <div style="margin: 20px 0;">
                    <img src="${updatedRequest?.Insighter?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/notifications/responses" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Personal Text Insight</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);

    } catch (error) {
        console.log(error)
    }
}

export async function getInsightByRequestId(id: string) {
    try {
        await connectToDatabase();

        const insight = await populateInsight(Insight.findOne({ Request: id }))

        return JSON.parse(JSON.stringify(insight))
    } catch (error) {
        console.log(error)
    }
}

export async function submitInsightRate(id: string, rating: number) {
    try {
        await connectToDatabase();

        const insight = await populateInsight(Insight.findOneAndUpdate(
            { Request: id },
            { '$set': { rated: true } }
        ));

        await UserData.updateOne(
            { User: insight?.Request?.Insighter },
            [
                {
                    $set: {
                        nofRatings: { $add: ["$nofRatings", 1] },
                        avgRating: {
                            $let: {
                                vars: {
                                    totalRatings: { $add: ["$nofRatings", 1] },
                                    newTotalRating: { $add: [{ $multiply: ["$avgRating", "$nofRatings"] }, rating] }
                                },
                                in: { $divide: ["$$newTotalRating", "$$totalRatings"] }
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

        const requests = await populateInsight(Insight.find({ User: userId }).sort({ createdAt: -1 }).limit(6))

        return JSON.parse(JSON.stringify(requests));
    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedResponses(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const responses = await populateInsight(Insight.find({ User: userId }).sort({ createdAt: -1 }))

        let startIndex = responses.findIndex((order: IInsight) => order._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedResponses = responses.slice(startIndex, startIndex + 6);

        return JSON.parse(JSON.stringify(paginatedResponses));
    } catch (error) {
        console.log(error)
    }
}

export async function flagInsight(id: string, message: string) {
    try {
        await connectToDatabase();

        const flaggedInsight = await Insight.findOneAndUpdate(
            { _id: id },
            { '$set': { insightful: "False", reportMessage: message } }
        )

    } catch (error) {
        console.log(error);
    }
}

export async function getFlaggedInsights() {
    try {
        await connectToDatabase();

        const insights = await populateInsight(Insight.find({ insightful: 'False' }).sort({ createdAt: 1 }))

        return JSON.parse(JSON.stringify(insights))

    } catch (error) {
        console.log(error);
    }
}