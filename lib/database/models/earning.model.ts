import { Schema, model, models, Document } from "mongoose";

const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export interface IEarning extends Document {
    _id: string,
    User: string,
    amount: number,
    fee: number,
    service: string,
    availableDate: Date,
    withdrawn: boolean,
    createdAt: Date
}

const EarningSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User", index: true },
    amount: { type: Number },
    fee: { type: Number },
    service: { type: String },
    availableDate: { type: Date },
    withdrawn: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

const Earning = models.Earning || model('Earning', EarningSchema);

export default Earning;