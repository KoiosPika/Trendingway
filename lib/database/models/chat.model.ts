import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IChat extends Document {
    _id: string,
    User1: IUser,
    User2: IUser,
    createdAt: Date
}

const ChatSchema = new Schema({
    User1: { type: Schema.Types.ObjectId, ref: "User", index: true },
    User2: { type: Schema.Types.ObjectId, ref: "User", index: true },
    createdAt: { type: Date, default: Date.now },
})

const Chat = models.Chat || model('Chat', ChatSchema);

export default Chat;