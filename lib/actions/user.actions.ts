'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'

export async function createUser(user: { clerkId: string, username: string, email: string, photo: string }) {
    try {
        await connectToDatabase()

        const newUser = await User.create({ ...user })

        const newUserData = await UserData.create({
            User: newUser._id,
            websiteLink: null,
            oneVideoPrice: 0.99,
            threeVideoPrice: 2.99,
            accountAuditPrice: 4.99,
            aboutMe: null,
            creditBalance: 0,
            withdrawBalance: 0,
            nofreviews: 0,
            avgReview: 0,
            nofVideoesReviewed: 0,
        })

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}