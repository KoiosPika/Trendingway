import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ISession extends Document {
    _id: string,
    user: string,
    sessionId: string,
    User: IUser,
    createdAt: Date
}

const SessionSchema = new Schema({
    user: { type: String },
    sessionId: { type: String },
    User: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
})

const Session = models.Session || model('Session', SessionSchema);

export default Session;