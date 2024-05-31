import { Schema, model, models, Document } from "mongoose";

export interface IEarning extends Document {
    _id: string,
    User: string,
    amount: number,
    service: string,
    createdAt: Date
}

const EarningSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    service: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Earning = models.Earning || model('Earning', EarningSchema);

export default Earning;