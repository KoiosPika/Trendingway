import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITipping extends Document {
    _id: string,
    User: IUser,
    amount: number,
    Tipper: IUser,
    createdAt: Date
}

const TippingSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Tipper: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
})

const Tipping = models.Tipping || model('Tipping', TippingSchema);

export default Tipping;