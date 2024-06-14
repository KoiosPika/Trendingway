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

export async function editUserData(userData:
    { userId: string, aboutMe: string, link: string, 
    TextInsight: number, TextInsightAvailability: boolean,
    TextPersonalInsight: number, TextPersonalInsightAvailability: boolean,
    LongTextInsight: number, LongTextInsightAvailability: boolean, 
    VideoInsight: number, VideoInsightAvailability: boolean, 
    VideoPersonalInsight: number, VideoPersonalInsightAvailability: boolean, 
    LongVideoInsight: number, LongVideoInsightAvailability: boolean, 
    TextProfileInsight: number, TextProfileInsightAvailability: boolean, 
    VideoProfileInsight: number, VideoProfileInsightAvailability: boolean,
    languages: string[], categories: string[] }) {
    try {
        await connectToDatabase()

        const data = await UserData.findOneAndUpdate(
            { User: userData.userId },
            {
                '$set': {
                    aboutMe: userData.aboutMe,
                    personalLink: userData.link,
                    TextInsight: userData.TextInsight,
                    TextInsightAvailability: userData.TextInsightAvailability,
                    TextPersonalInsight: userData.TextPersonalInsight,
                    TextPersonalInsightAvailability: userData.TextPersonalInsightAvailability,
                    LongTextInsight: userData.LongTextInsight,
                    LongTextInsightAvailability: userData.LongTextInsightAvailability,
                    VideoInsight: userData.VideoInsight,
                    VideoInsightAvailability: userData.VideoInsightAvailability,
                    VideoPersonalInsight: userData.VideoPersonalInsight,
                    VideoPersonalInsightAvailability: userData.VideoPersonalInsightAvailability,
                    LongVideoInsight: userData.LongVideoInsight,
                    LongVideoInsightAvailability: userData.LongVideoInsightAvailability,
                    TextProfileInsight: userData.TextProfileInsight,
                    TextProfileInsightAvailability: userData.TextProfileInsightAvailability,
                    VideoProfileInsight: userData.VideoProfileInsight,
                    VideoProfileInsightAvailability: userData.VideoProfileInsightAvailability,
                    languages: userData.languages,
                    categories: userData.categories
                }
            })

        return JSON.parse(JSON.stringify(data))

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
                            { $multiply: ['$avgRating', 0.7] }, 
                            { $multiply: ['$nofRatings', 0.3] }
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

export async function getTopUsersByConditions(matchConditions: any) {
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
                            { $multiply: ['$avgRating', 0.7] },
                            { $multiply: ['$nofRatings', 0.3] }
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