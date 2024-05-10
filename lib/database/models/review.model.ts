import { Schema, model, models, Document } from "mongoose";

const ReviewSchema = new Schema({
    Request: { type: Schema.Types.ObjectId, ref: "Request" },
    contentReview: { type: Number },
    contentNotes: { type: String },
    brightnessReview: { type: Number },
    brightnessNotes: { type: String },
    descriptionReview: { type: Number },
    descriptionNotes: { type: String },
    hashtagsReview: { type: Number },
    hashtagsNotes: { type: String },
    soundReview: { type: Number },
    soundNotes: { type: String },
    additionalNotes: { type: String },
    overallReview: { type: Number }
})

const Review = models.Review || model('Review', ReviewSchema);

export default Review;