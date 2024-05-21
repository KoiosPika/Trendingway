import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    websiteLink: string,
    oneVideoPrice: number,
    threeVideoPrice: number
    accountAuditPrice: number
    aboutMe: string
    creditBalance: number
    withdrawBalance: number
    nofreviews: number
    avgReview: number
    nofVideoesReviewed: number,
    expressAccountID: string,
    languages: string[],
    categories: string[],
}

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    websiteLink: { type: String },
    oneVideoPrice: { type: Number, default: 0 },
    threeVideoPrice: { type: Number, default: 0 },
    accountAuditPrice: { type: Number, default: 0 },
    aboutMe: { type: String },
    creditBalance: { type: Number, default: 0 },
    withdrawBalance: { type: Number, default: 0 },
    nofreviews: { type: Number, default: 0 },
    avgReview: { type: Number, default: 0 },
    nofVideoesReviewed: { type: Number, default: 0 },
    expressAccountID: { type: String },
    languages: { type: [String], required: true },
    categories: { type: [String], required: true },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;