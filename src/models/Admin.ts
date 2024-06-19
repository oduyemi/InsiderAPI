import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  password: string;
  createdAt: Date;
}

const adminSchema: Schema<IAdmin> = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\s]).{8,}$/.test(password),
      message: "Password must be at least 8 characters long and contain at least one capital letter, one small letter, one digit, and one special character.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.pre<IAdmin>("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err: any) {
    next(err);
  }
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
