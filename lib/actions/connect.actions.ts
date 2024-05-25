'use server'

import Stripe from "stripe";
import UserData, { IUserData } from "../database/models/userData.model";
import { connectToDatabase } from "../database";
import nodemailer from 'nodemailer';

async function createAccount(userId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {

        const account = await stripe.accounts.create({
            type: 'express'
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

async function createAccountLink(userId: string) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {
        await connectToDatabase();

        const user = await UserData.findOne({ User: userId });

        const accountLink = await stripe.accountLinks.create({
            account: user.expressAccountID,
            refresh_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/reauth`,
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/return`,
            type: 'account_onboarding',
        })

        return accountLink.url

    } catch (error) {
        console.log(error)
    }
}

export async function handleCreatingAccount(userId: string) {
    try {
        await createAccount(userId);

        const link = createAccountLink(userId);

        return link;
    } catch (error) {
        console.log(error)
    }
}

export async function createEmail(email: string, message: string) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    let mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `New contact form submission from Trendingway`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}