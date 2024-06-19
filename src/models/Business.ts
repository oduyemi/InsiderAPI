import mongoose, { Document, Schema } from "mongoose";

export interface IBusiness extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  industry: string;
}

const businessSchema: Schema<IBusiness> = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

const Business = mongoose.model<IBusiness>("Business", businessSchema);
export default Business;
