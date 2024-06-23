import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    personalLink: string,
    VideoInsight: number,
    VideoInsightAvailability: boolean,
    LongVideoInsight: number,
    LongVideoInsightAvailability: boolean,
    ProfileInsight: number,
    ProfileInsightAvailability: boolean,
    PersonalInsight: number,
    PersonalInsightAvailability: boolean,
    aboutMe: string
    creditBalance: number
    nofRatings: number
    avgRating: number
    nofVideoesInsighted: number,
    expressAccountID: string,
    onboardingCompleted: boolean,
    languages: string[],
    categories: string[],
    transferDate: Date
}

const substractDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    personalLink: { type: String },

    VideoInsight: { type: Number, default: 2.99 },
    VideoInsightAvailability: { type: Boolean, default: true },

    LongVideoInsight: { type: Number, default: 3.99 },
    LongVideoInsightAvailability: { type: Boolean, default: true },

    ProfileInsight: { type: Number, default: 3.99 },
    ProfileInsightAvailability: { type: Boolean, default: true },

    PersonalInsight: { type: Number, default: 4.99 },
    PersonalInsightAvailability: { type: Boolean, default: true },

    aboutMe: { type: String },
    creditBalance: { type: Number, default: 0 },
    nofRatings: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    nofVideoesInsighted: { type: Number, default: 0 },
    expressAccountID: { type: String },
    transferDate: { type: Date, default: () => substractDays(new Date(), 1) },
    onboardingCompleted: { type: Boolean, default: false },
    languages: { type: [String], required: true },
    categories: { type: [String], required: true },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;