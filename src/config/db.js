"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/businessreview";
mongoose_1.default.connect(dbURI, {});
const db = mongoose_1.default.connection;
db.once("open", () => {
    console.log("Connected to MongoDB database");
});
db.on("error", console.error.bind(console, "Mongodb Connection Error:"));
exports.default = db;
