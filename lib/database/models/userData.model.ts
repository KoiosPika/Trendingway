import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    websiteLink: string,
    TextReview: number,
    VideoReview: number,
    VideoProfileReview: number,
    TextProfileReview: number,
    aboutMe: string
    creditBalance: number
    withdrawBalance: number
    nofReviews: number
    avgReview: number
    nofVideoesReviewed: number,
    expressAccountID: string,
    languages: string[],
    categories: string[],
}

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    websiteLink: { type: String },
    TextReview: { type: Number, default: 0.99 },
    VideoReview: { type: Number, default: 2.99 },
    VideoProfileReview: { type: Number, default: 4.99 },
    TextProfileReview: { type: Number, default: 3.99 },
    aboutMe: { type: String },
    creditBalance: { type: Number, default: 0 },
    withdrawBalance: { type: Number, default: 0 },
    nofReviews: { type: Number, default: 0 },
    avgReview: { type: Number, default: 0 },
    nofVideoesReviewed: { type: Number, default: 0 },
    expressAccountID: { type: String },
    languages: { type: [String], required: true },
    categories: { type: [String], required: true },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;