import { Schema, model, models, Document } from "mongoose";
import { IRequest } from "./request.model";
import { IUser } from "./user.model";

export interface IInsight extends Document {
    _id: string
    Request: IRequest,
    Insighter: IUser,
    User: IUser,
    insightID: string
    contentRate: number,
    contentNotes: string,
    brightnessRate: number,
    brightnessNotes: string,
    descriptionRate: number,
    descriptionNotes: string,
    hashtagsRate: number,
    hashtagsNotes: string,
    soundRate: number,
    soundNotes: string,
    additionalNotes: string,
    bioRate: number,
    bioNotes: string,
    highlightsRate: number,
    highlightsNotes: string,
    postsRate: number,
    postsNotes: string,
    rated: boolean,
    createdAt: Date,
    insightful: string,
    insightPeriod: Date,
    reportMessage: string
}

const InsightSchema = new Schema({
    Request: { type: Schema.Types.ObjectId, ref: "Request" },
    Insighter: { type: Schema.Types.ObjectId, ref: "User" },
    User: { type: Schema.Types.ObjectId, ref: "User" },
    insightID: { type: String },
    contentRate: { type: Number },
    contentNotes: { type: String },
    brightnessRate: { type: Number },
    brightnessNotes: { type: String },
    descriptionRate: { type: Number },
    descriptionNotes: { type: String },
    hashtagsRate: { type: Number },
    hashtagsNotes: { type: String },
    soundRate: { type: Number },
    soundNotes: { type: String },
    bioRate: { type: Number },
    bioNotes: { type: String },
    highlightsRate: { type: Number },
    highlightsNotes: { type: String },
    postsRate: { type: Number },
    postsNotes: { type: String },
    additionalNotes: { type: String },
    rated: { type: Boolean, default: false },
    insightful: { type: String, default: 'Awaiting' },
    createdAt: { type: Date, default: Date.now },
    insightPeriod: {
        type: Date, default: () => {
            const now = new Date();
            return new Date(now.setDate(now.getDate() + 1));
        }
    },
    reportMessage: { type: String }
})

const Insight = models.Insight || model('Insight', InsightSchema);

export default Insight;