import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IStatus extends Document {
    _id: string,
    User: IUser,
    processing: boolean,
}

const StatusSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: "User" },
    processing: { type: Boolean, default: false },
})

const Status = models.Status || model('Status', StatusSchema);

export default Status;