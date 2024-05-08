'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'

export async function createUser(user: { clerkId: string, username: string, email: string, photo: string }) {
    try {
        await connectToDatabase()
        const newUser = await User.create({ ...user })

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}