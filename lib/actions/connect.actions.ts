'use server'

import Stripe from "stripe";
import UserData from "../database/models/userData.model";
import { connectToDatabase } from "../database";
import { ServerClient } from "postmark";
import { redirect } from "next/navigation";

async function createAccount(userId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {

        const account = await stripe.accounts.create({
            type: 'express',
        })

        await connectToDatabase();

        const user = await UserData.findOneAndUpdate(
            { User: userId },
            { '$set': { expressAccountID: account.id } }
        )

        return JSON.parse(JSON.stringify(user.expressAccountID))

    } catch (error) {
        console.log(error)
    }
}

export async function createAccountLink(userId: string) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {
        await connectToDatabase();

        const user = await UserData.findOne({ User: userId });

        const accountLink = await stripe.accountLinks.create({
            account: user.expressAccountID,
            refresh_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet`,
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet`,
            type: 'account_onboarding',
        })

        redirect(accountLink.url);

    } catch (error) {
        throw error;
    }
}

export async function getStripeDashboardLink(userId:string){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {
        await connectToDatabase();

        const user = await UserData.findOne({ User: userId });
        
        const loginLink = await stripe.accounts.createLoginLink(user?.expressAccountID);

        redirect(loginLink.url);

    } catch (error) {
        throw error;
    }
}

export async function handleCreatingAccount(userId: string) {
    try {
        await createAccount(userId);

        await createAccountLink(userId);

        return;
    } catch (error) {
        console.log(error)
    }
}

export async function createEmail(email: string, message: string) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'support@insightend.com',
            Subject: 'New Response Available',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">From: ${email}</h2>
                <h2 style="color: #333;">Message: ${message}</h2>
            </div>
            `,
        };

        await client.sendEmail(emailOptions);
    } catch (error) {
        console.log(error);
    }
}