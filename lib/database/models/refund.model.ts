import { Schema, model, models, Document } from "mongoose";

export interface IRefund extends Document {
    _id: string,
    User: string,
    amount: number,
    createdAt: Date
}

const RefundSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
})

const Refund = models.Refund || model('Refund', RefundSchema);

export default Refund;