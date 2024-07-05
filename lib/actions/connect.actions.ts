'use server'

import Stripe from "stripe";
import UserData from "../database/models/userData.model";
import { connectToDatabase } from "../database";
import { ServerClient } from "postmark";
import { redirect } from "next/navigation";
import UserFinancials from "../database/models/userFinancials.model";

async function createAccount(userId: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10'
    });

    try {

        const account = await stripe.accounts.create({
            type: 'express',
        })

        await connectToDatabase();

        const user = await UserFinancials.findOneAndUpdate(
            { User: userId },
            { '$set': { expressAccountID: account.id } }
        )

        return;

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

        const user = await UserFinancials.findOne({ User: userId });

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

        const user = await UserFinancials.findOne({ User: userId });
        
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

    } catch (error) {
        throw error;
    }
}

export async function createEmail(email: string, message: string) {

    const client = new ServerClient(process.env.POSTMARK_API_TOKEN!);

    try {
        // const emailOptions = {
        //     From: 'automated@insightend.com',
        //     To: 'support@insightend.com',
        //     Subject: 'New Email',
        //     HtmlBody:
        //         `
        //         <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
        //         <h2 style="color: #333;">From: ${email}</h2>
        //         <h2 style="color: #333;">Message: ${message}</h2>
        //     </div>
        //     `,
        // };
        const emailOptions = {
            From: 'support@insightend.com',
            To: 'rami10malass@gmail.com',
            Subject: 'Maximize Your Impact and Earnings with Insightend',
            HtmlBody:
                `
                <div style="max-width: 600px; font-family: Arial ;border-radius: 10px; box-shadow: 0 15px 15px rgba(0,0,0,0.3); padding: 15px 15px; font-weight: 500;">
                 <img src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJpVVN2a2hxcjFFQ2c5ZWFnSTQ2MEhrOEE2YSJ9"
                                alt="logo"
                                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                <p>Hi howtoai,</p>
        <p>I hope this message finds you well! I’m Rami Malass, the founder of Insightend, where we enable
            content
            creators like you to deepen connections with their audience through personalized insights and feedback.</p>
        <p>Here's what Insightend offers:</p>
        <ul>
            <li><strong>No Schedule Commitment:</strong> Respond to orders on your own time, from anywhere. Our platform
                is
                designed to fit seamlessly into your lifestyle, allowing you to provide valuable insights to your
                audience
                without disrupting your personal schedule.</li>
            <li><strong>Control Your Pricing:</strong> Set your own service rates based on the value you believe your
                expertise brings to your audience.</li>
            <li><strong>Service Flexibility:</strong> Activate or deactivate specific services at your convenience,
                giving
                you complete control over the types of engagements you accept.</li>
        </ul>
        <p>At Insightend, we offer various insight services tailored to different content types and
            interaction
            levels:</p>
        <ul>
            <li><strong>Video Insight: </strong> Provide feedback on short video content.</li>
            <li><strong>Long Video Insight: </strong>Offer detailed feedback for longer video content.</li>
            <li><strong>Profile Insight: </strong>Give critiques and advice on how to enhance social media profiles.
            </li>
            <li><strong>Personal Insights: </strong>Respond directly to individual messages from fans.</li>
            <li><strong>Random Insight: </strong>Viewers send videos and ask specific questions or for your commentary, allowing you to provide personalized insights on the content.
            </li>
            <li><strong>Long Random Insight: </strong>Similar to Random Insight but designed for longer video formats.
            </li>
        </ul>
        <p>Before you consider creating an account, I encourage you to navigate through our guide at <a
                href="http://www.insightend.com/guide">www.insightend.com/guide</a>. This guide will walk you through
            how
            our platform works, including how you receive orders, earn revenue, transfer money, and understand the fees
            involved.</p>
        <p>We believe your presence on our platform could not only provide immense value to your fans but also offer you
            a
            fresh avenue to monetize your expertise and insights in a meaningful way.</p>
        <p>Please note, Insightend is currently only operational in the United States. We are excited to explore opportunities to expand and serve more creators globally in the future.</p>
        <p>Please also review our Privacy Policy and Terms of Use to ensure you're informed about how we manage data and
            user interactions.</p>
        <p>Thank you for considering this opportunity, howtoai. I look forward to the possibility of welcoming
            you
            to our community.</p>
        <p>Warm regards,</p>
        <p>Rami Malass<br>
            support@insightend.com<br>
            https://www.insightend.com</p>
    </div>
            `,
        };

        await client.sendEmail(emailOptions);
    } catch (error) {
        console.log(error);
    }
}