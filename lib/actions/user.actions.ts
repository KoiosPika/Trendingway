'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import UserData from '../database/models/userData.model'
import UserFinancials from '../database/models/userFinancials.model'

export async function createUser(user: { clerkId: string, username: string, email: string, photo: string }) {
    try {
        await connectToDatabase()

        const newUser = await User.create({ ...user })

        await UserData.create({
            User: newUser?._id,
            personalLink: null,
            aboutMe: `Hi I'm ${user?.username}`,
        })

        await UserFinancials.create({
            User: newUser?._id
        })

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser({ id, user }: { id: string, user: { username: string, image_url: string } }) {
    try {
        await connectToDatabase();

        const thisUser = await User.findOneAndUpdate(
            { clerkId: id },
            {
                '$set': { username: user.username, photo: user.image_url }
            }
        )

        return JSON.parse(JSON.stringify(thisUser));
    } catch (error) {
        console.log(error)
    }
}

export async function getUserbyUserId(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId)

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

export async function getUsersByUsername(partialUsername: string) {
    try {
        await connectToDatabase();

        const users = await User.find({ username: { $regex: partialUsername, $options: 'i' } }).limit(10);

        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error)
    }
}