import { Schema, model, models, Document } from "mongoose";
import { IRequest } from "./request.model";
import { IUser } from "./user.model";

export interface IReview extends Document {
    _id: string
    Request: IRequest,
    Reviewer: IUser,
    User: IUser,
    reviewURL: string
    contentReview: number,
    contentNotes: string,
    brightnessReview: number,
    brightnessNotes: string,
    descriptionReview: number,
    descriptionNotes: string,
    hashtagsReview: number,
    hashtagsNotes: string,
    soundReview: number,
    soundNotes: string,
    additionalNotes: string,
    bioReview: number,
    bioNotes: string,
    highlightsReview: number,
    highlightsNotes: string,
    postsReview: number,
    postsNotes: string,
    rated: boolean,
    createdAt: Date,
    insightful: string,
    insightPeriod: Date
}

const ReviewSchema = new Schema({
    Request: { type: Schema.Types.ObjectId, ref: "Request" },
    Reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    User: { type: Schema.Types.ObjectId, ref: "User" },
    reviewURL: { type: String },
    contentReview: { type: Number },
    contentNotes: { type: String },
    brightnessReview: { type: Number },
    brightnessNotes: { type: String },
    descriptionReview: { type: Number },
    descriptionNotes: { type: String },
    hashtagsReview: { type: Number },
    hashtagsNotes: { type: String },
    soundReview: { type: Number },
    soundNotes: { type: String },
    bioReview: { type: Number },
    bioNotes: { type: String },
    highlightsReview: { type: Number },
    highlightsNotes: { type: String },
    postsReview: { type: Number },
    postsNotes: { type: String },
    additionalNotes: { type: String },
    rated: { type: Boolean, default: false },
    insightful: { type: String, default: 'Awaiting' },
    createdAt: { type: Date, default: Date.now },
    insightPeriod: {
        type: Date, default: () => {
            const now = new Date();
            return new Date(now.setDate(now.getDate() + 3));
        }
    }
})

const Review = models.Review || model('Review', ReviewSchema);

export default Review;