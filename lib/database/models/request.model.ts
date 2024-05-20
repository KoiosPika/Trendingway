import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IRequest extends Document {
    _id: string
    User: IUser,
    Reviewer: IUser,
    postLink: string,
    description: string,
    platform: string,
    reviewed: boolean,
    price: number
}

const RequestSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    postLink: { type: String },
    description: { type: String },
    platform: { type: String },
    reviewed: { type: Boolean, default: false },
    price: { type: Number }
})

const Request = models.Request || model('Request', RequestSchema);

export default Request;