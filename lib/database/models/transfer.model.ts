import { Schema, model, models, Document } from "mongoose";

export interface ITransfer extends Document {
    _id: string,
    User: string,
    amount: number,
    transferId: string,
    monthlyDeductible: boolean,
    fee: number,
    createdAt: Date
}

const TransferSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User", index: true },
    transferId: { type: String },
    amount: { type: Number },
    fee: { type: Number },
    monthlyDeductible: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
})

const Transfer = models.Transfer || model('Transfer', TransferSchema);

export default Transfer;