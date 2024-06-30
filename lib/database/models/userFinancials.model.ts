import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserFinancials extends Document {
    _id: string,
    User: IUser
    creditBalance: number
    expressAccountID: string,
    onboardingCompleted: boolean,
    transferDate: Date,
    points: number,
    lastRechargeDate: Date
}

const substractDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
};

const UserFinancialsSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User", index: true },
    creditBalance: { type: Number, default: 0 },
    expressAccountID: { type: String },
    transferDate: { type: Date, default: () => substractDays(new Date(), 1) },
    onboardingCompleted: { type: Boolean, default: false },
    lastOrderEmail: { type: Date, default: () => substractDays(new Date(), 1) },
    points: { type: Number, default: 0 },
    lastRechargeDate: { type: Date, default: () => substractDays(new Date(), 1) }
})

const UserFinancials = models.UserFinancials || model('UserFinancials', UserFinancialsSchema);

export default UserFinancials;