'use server'

import { ServerClient } from "postmark";
import { connectToDatabase } from "../database"
import Refund, { IRefund } from "../database/models/refund.model";
import Request from "../database/models/request.model";
import Review from "../database/models/review.model";
import User from "../database/models/user.model";
import UserData from "../database/models/userData.model";

const populateReview = (query: any) => {
    return query
        .populate({ path: 'Request', model: Request, select: "User Reviewer postLink description platform type price" })
        .populate({ path: 'User', model: User, select: "username photo" })
        .populate({ path: 'Reviewer', model: User, select: "username photo" })
}

export async function getAllRefunds(userId: string) {
    try {
        await connectToDatabase();

        const refunds = await Refund.find({ User: userId }).sort({ createdAt: -1 }).limit(3);

        return JSON.parse(JSON.stringify(refunds))

    } catch (error) {
        console.log(error)
    }
}

export async function getPaginatedRefunds(userId: string, lastOrderId: string) {
    try {
        await connectToDatabase();

        const refunds = await Refund.find({ User: userId }).sort({ createdAt: -1 })

        let startIndex = refunds.findIndex((refund: IRefund) => refund._id.toString() === lastOrderId)

        startIndex += 1

        const paginatedRefunds = refunds.slice(startIndex, startIndex + 9);

        return JSON.parse(JSON.stringify(paginatedRefunds));

    } catch (error) {
        console.log(error)
    }
}

export async function refundOrder(requestId: string) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        const review = await populateReview(Review.findOneAndUpdate(
            { Request: requestId },
            { insightful: 'True' }
        ))

        await Request.findOneAndUpdate(
            { _id: requestId },
            { '$set': { status: 'Canceled' } }
        )

        await UserData.findOneAndUpdate(
            { User: review?.User },
            { '$inc': { creditBalance: review?.Request?.price } }
        )

        await Refund.create({
            User: review?.User,
            amount: review?.Request?.price
        })

        const UserEmailOptions = {
            From: 'automated@insightend.com',
            To: 'admin@insightend.com',
            Subject: 'Order Canceled',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">Hi ${review?.User?.username}, We have refunded your order successfully</h2>
                <div style="margin: 20px 0;">
                    <img src="${review?.Reviewer?.photo}" alt="User Image" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 20px;" />
                </div>
                <p style="font-size: 16px; color: #555;">After reviewing the insight you received from ${review?.Reviewer?.username}, we decided to cancel the order and refund $${(review?.Request?.price).toFixed(2)} to your credit balance as the insight violates the terms and conditions of insightend.com</p>
                <p style="font-size: 16px; color: #555;">You can check your refunds in the Refunds section in your wallet page</p>
                <div style="margin-top: 20px;">
                    <a href="https://www.insightend.com/wallet" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #FFFFFF; background-color: #EC1A0D; border-radius: 5px; text-decoration: none;">Go to Wallet</a>
                </div>
            </div>
            `,
        };

        await client.sendEmail(UserEmailOptions);


    } catch (error) {
        console.log(error);
    }
}