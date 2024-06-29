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
    {
        userId: string, aboutMe: string, link: string,
        VideoInsight: number, VideoInsightAvailability: boolean,
        LongVideoInsight: number, LongVideoInsightAvailability: boolean,
        RandomInsight: number, RandomInsightAvailability: boolean,
        LongRandomInsight: number, LongRandomInsightAvailability: boolean,
        ProfileInsight: number, ProfileInsightAvailability: boolean,
        PersonalInsight: number, PersonalInsightAvailability: boolean,
        languages: string[], categories: string[]
    }) {
    try {
        await connectToDatabase()

        const data = await UserData.findOneAndUpdate(
            { User: userData.userId },
            {
                '$set': {
                    aboutMe: userData.aboutMe,
                    personalLink: userData.link,
                    VideoInsight: userData.VideoInsight,
                    VideoInsightAvailability: userData.VideoInsightAvailability,
                    LongVideoInsight: userData.LongVideoInsight,
                    LongVideoInsightAvailability: userData.LongVideoInsightAvailability,
                    RandomInsight: userData.RandomInsight,
                    RandomInsightAvailability: userData.RandomInsightAvailability,
                    LongRandomInsight: userData.LongRandomInsight,
                    LongRandomInsightAvailability: userData.LongRandomInsightAvailability,
                    ProfileInsight: userData.ProfileInsight,
                    ProfileInsightAvailability: userData.ProfileInsightAvailability,
                    PersonalInsight: userData.PersonalInsight,
                    PersonalInsightAvailability: userData.PersonalInsightAvailability,
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

export async function createFields() {
    try {
        await connectToDatabase();

        const users = await UserData.updateMany(
            {}, // The filter object is empty, which means this operation will affect all documents
            {
                '$set': {
                    RandomInsight: 2.99,
                    RandomInsightAvailability: true,
                    LongRandomInsight: 3.99,
                    LongRandomInsightAvailability: true,
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}