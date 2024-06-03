import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    websiteLink: string,
    TextReview: number,
    TextReviewAvailability: boolean,
    LongTextReview: number,
    LongTextReviewAvailability: boolean,
    VideoReview: number,
    VideoReviewAvailability: boolean,
    LongVideoReview: number,
    LongVideoReviewAvailability: boolean,
    VideoProfileReview: number,
    VideoProfileReviewAvailability: boolean,
    TextProfileReview: number,
    TextProfileReviewAvailability: boolean,
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
    TextReviewAvailability: { type: Boolean, default: true },
    LongTextReview: { type: Number, default: 1.99 },
    LongTextReviewAvailability: { type: Boolean, default: true },
    VideoReview: { type: Number, default: 2.99 },
    VideoReviewAvailability: { type: Boolean, default: true },
    LongVideoReview: { type: Number, default: 3.99 },
    LongVideoReviewAvailability: { type: Boolean, default: true },
    VideoProfileReview: { type: Number, default: 4.99 },
    VideoProfileReviewAvailability: { type: Boolean, default: true },
    TextProfileReview: { type: Number, default: 3.99 },
    TextProfileReviewAvailability: { type: Boolean, default: true },
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