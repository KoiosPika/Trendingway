import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IRequest extends Document {
    _id: string
    User: IUser,
    Insighter: IUser,
    postLink: string,
    description: string,
    platform: string,
    insighted: boolean,
    type: string
    price: number,
    status: string,
    message: string,
    chatId: string,
    messageId: string,
    createdAt: Date
}

const RequestSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Insighter: { type: Schema.Types.ObjectId, ref: "User" },
    postLink: { type: String },
    description: { type: String },
    platform: { type: String },
    insighted: { type: Boolean },
    status: { type: String, default: 'Awaiting' },
    price: { type: Number },
    type: { type: String },
    message: { type: String },
    chatId: { type: String },
    messageId: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const Request = models.Request || model('Request', RequestSchema);

export default Request;