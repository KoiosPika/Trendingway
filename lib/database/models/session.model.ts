import { Schema, model, models, Document } from "mongoose";

export interface ISession extends Document {
    _id: string,
    user: string,
    sessionId: string,
    createdAt: Date
}

const SessionSchema = new Schema({
    user: { type: String },
    sessionId: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Session = models.Session || model('Session', SessionSchema);

export default Session;