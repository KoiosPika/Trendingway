import { Schema, model, models, Document } from "mongoose";

const OrderSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number },
    stripeId: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;