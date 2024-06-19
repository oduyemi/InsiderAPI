import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import db from "./config/db"; 
import routes from "./routes";
import graphqlMiddleware from "./middlewares";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app: Application = express();

// Session configuration
app.use(session({
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: true
}));

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000"]
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);
app.use("/graphql", graphqlMiddleware);

// Proxy middleware
app.use("/api", createProxyMiddleware({
  target: "http://192.168.43.113:3000/",
  changeOrigin: true,
}));

// Database connection error handling
db.on("error", console.error.bind(console, "Mongodb Connection Error:"));


// Start the server
const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
