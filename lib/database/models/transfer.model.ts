import { Schema, model, models, Document } from "mongoose";

export interface ITransfer extends Document {
    _id: string,
    User: string,
    amount: number,
    transferId: string,
    createdAt: Date
}

const TransferSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    transferId: { type: String },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
})

const Transfer = models.Transfer || model('Transfer', TransferSchema);

export default Transfer;