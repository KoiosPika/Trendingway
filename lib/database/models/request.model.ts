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
    type: string
    price: number,
    status: string,
    message: string,
    createdAt: Date
}

const RequestSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    postLink: { type: String },
    description: { type: String },
    platform: { type: String },
    reviewed: { type: Boolean },
    status: { type: String, default: 'Awaiting' },
    price: { type: Number },
    type: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const Request = models.Request || model('Request', RequestSchema);

export default Request;