import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/businessreview";

mongoose.connect(dbURI, {
  
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB database");
});

db.on("error", console.error.bind(console, "Mongodb Connection Error:"));

export default db;
