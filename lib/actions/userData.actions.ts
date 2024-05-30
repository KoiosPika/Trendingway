'use server'

import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import UserData, { IUserData } from "../database/models/userData.model"

const populateUsers = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
}

type AggregationStage =
    | { $match: any }
    | { $addFields: any }
    | { $limit: number };

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

export async function editUserData({ userId, aboutMe, link, TextReview, VideoReview, TextProfileReview, VideoProfileReview, languages, categories }:
    { userId: string, aboutMe: string, link: string, TextReview: number, VideoReview: number, TextProfileReview: number, VideoProfileReview: number, languages: string[], categories: string[] }) {
    try {
        await connectToDatabase()

        const userData = await UserData.findOneAndUpdate(
            { User: userId },
            {
                '$set': {
                    aboutMe,
                    websiteLink: link,
                    TextReview,
                    VideoReview,
                    TextProfileReview,
                    VideoProfileReview,
                    languages,
                    categories
                }
            })

        return JSON.parse(JSON.stringify(userData))

    } catch (error) {
        console.log(error)
    }
}

export async function getUsers() {
    try {
        await connectToDatabase();

        const users = await populateUsers(UserData.find())

        return JSON.parse(JSON.stringify(users));

    } catch (error) {
        console.log(error)
    }
}

export async function getTopUsers() {
    try {
        await connectToDatabase();

        const users = await User.aggregate([
            {
                $addFields: {
                    compositeScore: {
                        $add: [
                            { $multiply: ['$avgReview', 0.7] }, // Weighted avgReview (e.g., 70%)
                            { $multiply: ['$nofReviews', 0.3] } // Weighted nofReviews (e.g., 30%)
                        ]
                    }
                }
            },
            {
                $sort: { compositeScore: 1 } // Sort by compositeScore in descending order
            }
        ]);

        const userIds = users.map(user => user._id);

        const populatedUsers = await populateUsers(UserData.find({ User: { $in: userIds } }));

        return JSON.parse(JSON.stringify(populatedUsers));

    } catch (error) {
        console.log(error)
    }
}

export async function getTopUsersByConditions(matchConditions:any) {
    try {
        await connectToDatabase();

        const pipeline: AggregationStage[] = [
            {
                $match: matchConditions
            },
            {
                $addFields: {
                    compositeScore: {
                        $add: [
                            { $multiply: ['$avgReview', 0.7] },
                            { $multiply: ['$nofReviews', 0.3] }
                        ]
                    }
                }
            }
        ];

        pipeline.push({ $limit: 50 });

        const usersData = await UserData.aggregate(pipeline);

        const userIds = usersData.map((userData: IUserData) => userData.User);
        const populatedUsers = await populateUsers(UserData.find({ User: { $in: userIds } }));

        return JSON.parse(JSON.stringify(populatedUsers));

    } catch (error) {
        console.log(error)
    }
}