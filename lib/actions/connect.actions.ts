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
        const emailOptions = {
            From: 'automated@insightend.com',
            To: 'support@insightend.com',
            Subject: 'New Email',
            HtmlBody:
                `
                <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; text-align: center;">
                <h2 style="color: #333;">From: ${email}</h2>
                <h2 style="color: #333;">Message: ${message}</h2>
            </div>
            `,
        };
        
    //     const emailOptions = {
    //         From: 'support@insightend.com',
    //         To: '###',
    //         Subject: 'Enhance Your Connection with Fans with Insightend',
    //         HtmlBody:
    //             `
    //             <div
    //     style="max-width: 600px; font-family: Arial ;border-radius: 10px; box-shadow: 0 15px 15px rgba(0,0,0,0.3); padding: 15px 15px; font-weight: 500;">
    //     <img src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJpVVN2a2hxcjFFQ2c5ZWFnSTQ2MEhrOEE2YSJ9"
    //         alt="logo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
    //     <p>Hi Leo Ai,</p>
    //     <p>I hope this message finds you well! I’m Rami Malass, the founder of Insightend. We enable content creators like you to deepen connections with your audience through diverse and innovative methods.</p>
    //     <p>At Insightend, we’ve identified a significant disconnect between influencers and their audiences—a gap we are committed to bridging. Our platform is tailored to enhance these connections by enabling you to leverage your expertise to assist others in growing their accounts. Additionally, we offer avenues to monetize audience interactions, such as through direct messaging and providing a platform for your audience to send you videos for personal commentary and reactions.</p>
    //     <p>Here's what Insightend offers:</p>
    //     <ul>
    //         <li style="margin-top: 15px;"><strong>No Schedule Commitment:</strong> Respond to orders on your own time, from anywhere. Our platform
    //             is
    //             designed to fit seamlessly into your lifestyle, allowing you to provide valuable insights to your
    //             audience
    //             without disrupting your personal schedule.</li>
    //         <li style="margin-top: 15px;"><strong>Control Your Pricing:</strong> Set your own service rates based on the value you believe your
    //             expertise brings to your audience.</li>
    //         <li style="margin-top: 15px;"><strong>Service Flexibility:</strong> Activate or deactivate specific services at your convenience,
    //             giving
    //             you complete control over the types of engagements you accept.</li>
    //     </ul>
    //     <p>At Insightend, we offer various insight services tailored to different content types and
    //         interaction
    //         levels:</p>
    //     <ul>
    //         <li style="margin-top: 10px;"><strong>Video Insight: </strong> This service allows your viewers to send you short video content for feedback. You can provide targeted advice on strategies to increase their views, focusing on enhancing content quality and viewer engagement.</li>
    //         <li style="margin-top: 10px;"><strong>Long Video Insight: </strong> Similar to Video Insight but for more extensive content. This service lets you delve deeper, offering comprehensive feedback on longer videos, ideal for detailed content strategies and in-depth viewer retention techniques.            </li>
    //         <li style="margin-top: 10px;"><strong>Profile Insight: </strong> Utilize this service to review and critique social media profiles or YouTube channels. You can offer personalized tips on how they can optimize their profiles to attract more subscribers and increase visibility.</li>
    //         <li style="margin-top: 10px;"><strong>Personal Insights: </strong> This is perfect for responding to direct inquiries from your fans or fellow creators who seek specific advice or tips related to increasing views and channel growth. Additionally, it provides a platform for casual conversations, allowing your audience to simply send messages and chat with you, fostering a more personal connection.</li>
    //         <li style="margin-top: 10px;"><strong>Random Insight: </strong> Viewers can send videos asking for your analysis on why certain content may have performed well. You can provide insights into the elements that likely contributed to the video’s success, using examples to illustrate effective strategies. Additionally, they can send any video and simply request your commentary on it, providing a platform for you to offer your unique insights or personal opinions on a wide range of video content.            </li>
    //         <li style="margin-top: 10px;"><strong>Long Random Insight: </strong> Extend the Random Insight service to longer videos, allowing for a more thorough examination and detailed feedback, which is especially useful for complex topics or detailed analytical requests.</li>
    //     </ul>
    //     <p>Before you consider creating an account, I encourage you to navigate through our guide at <a
    //             href="http://www.insightend.com/guide">www.insightend.com/guide</a>. This guide will walk you through
    //         how
    //         our platform works, including how you receive orders, earn revenue, transfer money, and understand the fees
    //         involved.</p>
    //     <p>We believe your presence on our platform offers several advantages. Not only can it serve as a channel to monetize your expertise, but it also allows you to construct a meaningful bridge to your fans. By setting affordable prices for personalized interactions, you provide exceptional value, making your insights more accessible to a wider audience.</p>
    //     <strong>Important Notes:</strong>
    //     <p><strong>1. </strong>Insightend is currently only operational in the United States. We are excited to explore
    //         opportunities to expand and serve more creators globally in the future.</p>
    //     <p><strong>2. </strong> If you decide to join our platform, please reply to this email with your username.
    //         This will enable me to personally request various services from you. It's a great way for you to try out the
    //         system, engage directly with requests, and see how earning and transferring money works on our platform.</p>
    //     <p><strong>3. </strong>You can review our <a href="https://www.insightend.com/privacy">Privacy Policy</a> and <a href="https://www.insightend.com/terms">Terms of Use</a> to ensure you're informed about how we manage data and
    //         user interactions.</p>
    //     <p>Thank you for considering this opportunity, Leo Ai. I look forward to the possibility of welcoming
    //         you
    //         to our community.</p>
    //     <p>Warm regards,</p>
    //     <p>Rami Malass<br>
    //         support@insightend.com<br>
    //         https://www.insightend.com</p>
    // </div>
    //         `,
    //     };

        await client.sendEmail(emailOptions);
    } catch (error) {
        console.log(error);
    }
}