import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
    _id: string,
    User: string,
    amount: number,
    stripeId: string,
    type: string,
    createdAt: Date
}

const OrderSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User", index: true },
    amount: { type: Number },
    type: { type: String },
    stripeId: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;