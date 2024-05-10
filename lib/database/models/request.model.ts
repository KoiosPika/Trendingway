import { Schema, model, models, Document } from "mongoose";

const RequestSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    Reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    postLink: { type: String },
    description: { type: String },
    platform: { type: String },
    reviewed: { type: Boolean, default: false },
    price: {type: Number}
})

const Request = models.Request || model('Request', RequestSchema);

export default Request;