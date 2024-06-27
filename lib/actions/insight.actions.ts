'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'
import Insight, { IInsight } from '../database/models/insight.model'
import Request, { IRequest } from '../database/models/request.model'
import { ServerClient } from 'postmark';
import { createEarning } from './earning.actions'
import Message from '../database/models/message.model'
import { ClientSession } from 'mongoose'
import Status from '../database/models/status.model'

const populateInsight = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Insighter postLink description platform type price chatId" })
        .populate({ path: 'User', model: User, select: "_id username photo" })
        .populate({ path: 'Insighter', model: User, select: "_id username photo" })
}

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
        .populate({ path: 'Insighter', model: User, select: "_id photo username" })
}

export async function createVideoInsight(insight: { request: string, contentNotes: string, contentRate: number, brightnessNotes: string, brightnessRate: number, descriptionNotes: string, descriptionRate: number, hashtagsNotes: string, hashtagsRate: number, soundNotes: string, soundRate: number, additionalNotes: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {
        const db = await connectToDatabase()

        const status = await Status.findOneAndUpdate(
            { User: insight.Insighter, processing: false },
            { $set: { processing: true } },
            { new: true }
        );

        if (!status) {
            return false;
        }

        session = await db.startSession();
        session.startTransaction();

        const request: IRequest | null = await Request.findById(insight.request).session(session);

        if (request?.insighted) {
            throw Error;
        }

        const newInsight: IInsight | any = await Insight.create([{
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
        }], { session })

        const updatedRequest = await populateRequest(Request.findByIdAndUpdate(
            insight.request,
            { $set: { status: 'Completed', insighted: true } },
            { session }
        ))

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

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
                    <a href="https://www.insightend.com/activity/insights" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #4299E1; border-radius: 5px; text-decoration: none;">Go to Video Insight</a>
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

        await Status.findOneAndUpdate({ User: insight.Insighter }, { '$set': { processing: false } })

        return false;
    }
}

export async function createProfileInsight(insight: { request: string, bioNotes: string, bioRate: number, highlightsNotes: string, highlightsRate: number, postsNotes: string, postsRate: number, additionalNotes: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()

        const status = await Status.findOneAndUpdate(
            { User: insight.Insighter, processing: false },
            { $set: { processing: true } },
            { new: true }
        );

        if (!status) {
            return false;
        }

        session = await db.startSession();
        session.startTransaction();

        const request: IRequest | null = await Request.findById(insight.request).session(session);

        if (request?.insighted) {
            throw Error;
        }

        const newInsight: any = await Insight.create([{
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
        }], { session })

        const updatedRequest = await populateRequest(Request.findByIdAndUpdate(
            insight.request,
            { $set: { status: 'Completed', insighted: true } },
            { session }
        ))

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

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
                    <a href="https://www.insightend.com/activity/insights" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Profile Insight</a>
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

        await Status.findOneAndUpdate({ User: insight.Insighter }, { '$set': { processing: false } })

        return false;
    }
}

export async function createPersonalInsight(insight: { request: string, text: string, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()

        const status = await Status.findOneAndUpdate(
            { User: insight.Insighter, processing: false },
            { $set: { processing: true } },
            { new: true }
        );

        if (!status) {
            return false;
        }

        session = await db.startSession();
        session.startTransaction();

        const req : IRequest | null = await Request.findById(insight.request).session(session)

        if (req?.insighted) {
            throw Error;
        }

        const message = await Message.create([{
            Chat: req?.chatId,
            User: insight.Insighter,
            type: "text",
            text: insight.text
        }], { session })

        const newInsight = await Insight.create([{
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            insightful: 'Completed',
        }], { session })

        let updatedRequest = await populateRequest(Request.findByIdAndUpdate(
            insight.request,
            { $set: { status: 'Completed', insighted: true } },
            { session }
        ))

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

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
                    <a href="https://www.insightend.com/activity/insights" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #E86510; border-radius: 5px; text-decoration: none;">Go to Personal Insight</a>
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

        await Status.findOneAndUpdate({ User: insight.Insighter }, { '$set': { processing: false } })
        
        console.log(error)

        return false;

    }
}

export async function createOpinionInsight(insight: { request: string, contentNotes: string, contentRate: number, Insighter: string, User: string }) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    let session: ClientSession | null = null;

    try {
        const db = await connectToDatabase()

        const status = await Status.findOneAndUpdate(
            { User: insight.Insighter, processing: false },
            { $set: { processing: true } },
            { new: true }
        );

        if (!status) {
            return false;
        }

        session = await db.startSession();
        session.startTransaction();

        const request: IRequest | null = await Request.findById(insight.request).session(session);

        if (request?.insighted) {
            throw Error;
        }

        const newInsight: IInsight | any = await Insight.create([{
            Request: insight.request,
            Insighter: insight.Insighter,
            User: insight.User,
            contentRate: insight.contentRate,
            contentNotes: insight.contentNotes,
        }], { session })

        const updatedRequest = await populateRequest(Request.findByIdAndUpdate(
            insight.request,
            { $set: { status: 'Completed', insighted: true } },
            { session }
        ))

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

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
                    <a href="https://www.insightend.com/activity/insights" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #4299E1; border-radius: 5px; text-decoration: none;">Go to Video Insight</a>
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

        await Status.findOneAndUpdate({ User: insight.Insighter }, { '$set': { processing: false } })

        return false;
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

    let session: ClientSession | null = null;

    try {

        const db = await connectToDatabase()
        session = await db.startSession();
        session.startTransaction();

        const insight = await populateInsight(Insight.findOneAndUpdate(
            { Request: id },
            { '$set': { rated: true } },
            { session }
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
            ],
            { session }
        )

        await session.commitTransaction();
        session.endSession();


    } catch (error) {

        if (session) {
            await session.abortTransaction();
            session.endSession();
        }

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