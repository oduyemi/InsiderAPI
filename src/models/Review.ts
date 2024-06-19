import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}

const reviewSchema: Schema<IReview> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
