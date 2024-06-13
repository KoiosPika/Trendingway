import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ISpending extends Document {
    _id: string,
    User: IUser,
    amount: number,
    service: string,
    createdAt: Date
}

const SpendingSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Insighter: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    service: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Spending = models.Spending || model('Spending', SpendingSchema);

export default Spending;