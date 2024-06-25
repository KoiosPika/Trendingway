import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

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
    endDate: Date,
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
    endDate: { type: Date, default: () => addDays(new Date(), 5) },
    createdAt: { type: Date, default: Date.now }
})

const Request = models.Request || model('Request', RequestSchema);

export default Request;