import { Schema, model, models, Document } from "mongoose";
import { IChat } from "./chat.model";
import { IUser } from "./user.model";

export interface IMessage extends Document {
    _id: string,
    Chat: IChat,
    User: IUser
    type: string,
    text: string,
    createdAt: Date
}

const MessageSchema = new Schema({
    Chat: { type: Schema.Types.ObjectId, ref: "Chat", index:true },
    User: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String },
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Message = models.Message || model('Message', MessageSchema);

export default Message;