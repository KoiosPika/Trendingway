import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    personalLink: string,
    TextInsight: number,
    TextInsightAvailability: boolean,
    LongTextInsight: number,
    LongTextInsightAvailability: boolean,
    VideoInsight: number,
    VideoInsightAvailability: boolean,
    LongVideoInsight: number,
    LongVideoInsightAvailability: boolean,
    VideoProfileInsight: number,
    VideoProfileInsightAvailability: boolean,
    TextProfileInsight: number,
    TextProfileInsightAvailability: boolean,
    VideoPersonalInsight: number,
    VideoPersonalInsightAvailability: boolean,
    TextPersonalInsight: number,
    TextPersonalInsightAvailability: boolean,
    aboutMe: string
    creditBalance: number
    withdrawBalance: number
    nofRatings: number
    avgRating: number
    nofVideoesInsighted: number,
    expressAccountID: string,
    onboardingCompleted: boolean,
    languages: string[],
    categories: string[],
}

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    personalLink: { type: String },

    TextInsight: { type: Number, default: 0.99 },
    TextInsightAvailability: { type: Boolean, default: true },

    LongTextInsight: { type: Number, default: 1.99 },
    LongTextInsightAvailability: { type: Boolean, default: true },

    VideoInsight: { type: Number, default: 2.99 },
    VideoInsightAvailability: { type: Boolean, default: true },

    LongVideoInsight: { type: Number, default: 3.99 },
    LongVideoInsightAvailability: { type: Boolean, default: true },

    VideoProfileInsight: { type: Number, default: 4.99 },
    VideoProfileInsightAvailability: { type: Boolean, default: true },

    TextProfileInsight: { type: Number, default: 3.99 },
    TextProfileInsightAvailability: { type: Boolean, default: true },

    VideoPersonalInsight: { type: Number, default: 4.99 },
    VideoPersonalInsightAvailability: { type: Boolean, default: true },

    TextPersonalInsight: { type: Number, default: 3.99 },
    TextPersonalInsightAvailability: { type: Boolean, default: true },

    aboutMe: { type: String },
    creditBalance: { type: Number, default: 0 },
    withdrawBalance: { type: Number, default: 0 },
    nofRatings: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    nofVideoesInsighted: { type: Number, default: 0 },
    expressAccountID: { type: String },
    onboardingCompleted: { type: Boolean, default:false },
    languages: { type: [String], required: true },
    categories: { type: [String], required: true },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;