'use server'

import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import UserData, { IUserData } from "../database/models/userData.model"

const populateUsers = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
}

export async function getUserDataByUsername(username: string) {
    try {
        await connectToDatabase()

        const userId = await User.findOne({ username })

        const userData = await populateUsers(UserData.findOne({ User: userId }))

        return JSON.parse(JSON.stringify(userData))

    } catch (error) {
        console.log(error)
    }
}

export async function getUserDataByUserId(userId: string) {
    try {
        await connectToDatabase()

        const userData = await populateUsers(UserData.findOne({ User: userId }))

        return JSON.parse(JSON.stringify(userData))

    } catch (error) {
        console.log(error)
    }
}

export async function editUserData({ userId, aboutMe, link, oneVideoPrice }: { userId: string, aboutMe: string, link: string, oneVideoPrice: number }) {
    try {
        await connectToDatabase()

        const userData = await UserData.findOneAndUpdate({
            User: userId,
            aboutMe,
            websiteLink: link,
            oneVideoPrice
        })

        return JSON.parse(JSON.stringify(userData))

    } catch (error) {
        console.log(error)
    }
}