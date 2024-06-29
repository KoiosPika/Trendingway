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
    RandomInsight: number,
    RandomInsightAvailability: boolean,
    LongRandomInsight: number,
    LongRandomInsightAvailability: boolean,
    aboutMe: string
    nofRatings: number
    avgRating: number
    nofVideoesInsighted: number,
    languages: string[],
    categories: string[],
}

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User", index: true },
    personalLink: { type: String },
    VideoInsight: { type: Number, default: 2.99 },
    VideoInsightAvailability: { type: Boolean, default: true },
    LongVideoInsight: { type: Number, default: 3.99 },
    LongVideoInsightAvailability: { type: Boolean, default: true },
    ProfileInsight: { type: Number, default: 3.99 },
    ProfileInsightAvailability: { type: Boolean, default: true },
    PersonalInsight: { type: Number, default: 4.99 },
    PersonalInsightAvailability: { type: Boolean, default: true },
    RandomInsight: { type: Number, default: 2.99 },
    RandomInsightAvailability: { type: Boolean, default: true },
    LongRandomInsight: { type: Number, default: 3.99 },
    LongRandomInsightAvailability: { type: Boolean, default: true },
    aboutMe: { type: String },
    nofRatings: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    nofVideoesInsighted: { type: Number, default: 0 },
    languages: { type: [String], required: true },
    categories: { type: [String], required: true },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;