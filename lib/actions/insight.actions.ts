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
import UserFinancials from '../database/models/userFinancials.model'

const populateInsight = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Insighter postLink description platform type price chatId" })
        .populate({ path: 'User', model: User, select: "_id username photo" })
        .populate({ path: 'Insighter', model: User, select: "_id username photo" })
}

const populateRequest = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username email" })
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

        if (request?.insighted || request?.status != 'Awaiting') {
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

        await UserFinancials.findOneAndUpdate({ User: insight.Insighter }, { '$inc': { "currentRequests": -1 } }, { session })

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        const emailOptions = {
            From: 'automated@insightend.com',
            To: `${updatedRequest.User.email}`,
            Subject: 'New Insight Available',
            HtmlBody:
                `<table width="100%" cellspacing="0" cellpadding="0" style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
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
                <h3 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: left; padding: 10px;">
                            <img src="${updatedRequest?.Insighter?.photo}" alt="photo"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                        <td style="background-color: #3182ce; color: white; padding: 5px; border-radius: 0 20px 20px 20px; width: 85%; font-size: 14px;">
                            ${insight.contentNotes}
                        </td>
                    </tr>
                </table>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/insights"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #3182ce; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Video Insight</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`,
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

        if (request?.insighted || request?.status != 'Awaiting') {
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

        await UserFinancials.findOneAndUpdate({ User: insight.Insighter }, { '$inc': { "currentRequests": -1 } }, { session })

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        const emailOptions = {
            From: 'automated@insightend.com',
            To: `${updatedRequest.User.email}`,
            Subject: 'New Insight Available',
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
                <h3 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: left; padding: 10px;">
                            <img src="${updatedRequest?.Insighter?.photo}" alt="photo"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                        <td style="background-color: #E85819; padding: 5px; border-radius: 0 20px 20px 20px; width: 85%; font-size: 14px; color: #FFF;">
                            ${insight.bioNotes}
                        </td>
                    </tr>
                </table>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/insights"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #E85819; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Profile Insight</a>
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

        const req: IRequest | null = await Request.findById(insight.request).session(session)

        if (req?.insighted || req?.status != 'Awaiting') {
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

        await UserFinancials.findOneAndUpdate({ User: insight.Insighter }, { '$inc': { "currentRequests": -1 } }, { session })

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        const emailOptions = {
            From: 'automated@insightend.com',
            To: `${updatedRequest.User.email}`,
            Subject: 'New Insight Available',
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
                <h3 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: left; padding: 10px;">
                            <img src="${updatedRequest?.Insighter?.photo}" alt="photo"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                        <td style="background-color: #D40F6F; padding: 5px; border-radius: 0 20px 20px 20px; width: 85%; font-size: 14px; color: #FFF;">
                            ${insight.text}
                        </td>
                    </tr>
                </table>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/insights"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #D40F6F; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Chat</a>
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

        await Status.findOneAndUpdate({ User: insight.Insighter }, { '$set': { processing: false } })

        console.log(error)

        return false;

    }
}

export async function createRandomInsight(insight: { request: string, contentNotes: string, contentRate: number, Insighter: string, User: string }) {

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

        if (request?.insighted || request?.status != 'Awaiting') {
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

        await UserFinancials.findOneAndUpdate({ User: insight.Insighter }, { '$inc': { "currentRequests": -1 } }, { session })

        await createEarning(insight.request, session)

        await session.commitTransaction();
        session.endSession();

        await Status.findByIdAndUpdate(status._id, { '$set': { processing: false } })

        const emailOptions = {
            From: 'automated@insightend.com',
            To: `${updatedRequest.User.email}`,
            Subject: 'New Insight Available',
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
                <h3 style="color: #333;">A new insight by ${updatedRequest?.Insighter?.username} is available!</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: left; padding: 10px;">
                            <img src="${updatedRequest?.Insighter?.photo}" alt="photo"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                        </td>
                        <td style="background-color: #267A13; padding: 5px; border-radius: 0 20px 20px 20px; width: 85%; font-size: 14px; color: #FFF;">
                            ${insight.contentNotes}
                        </td>
                    </tr>
                </table>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px; text-align: center; vertical-align: middle;">
                            <a href="https://www.insightend.com/activity/insights"
                                style="display: inline-block; padding: 10px; font-size: 16px; color: #FFFFFF; background-color: #267A13; border-radius: 5px; text-decoration: none; width: 75%; text-align: center;">Go to Random Insight</a>
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