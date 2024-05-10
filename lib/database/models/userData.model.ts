import { Schema, model, models, Document } from "mongoose";

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
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;