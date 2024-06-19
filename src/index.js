"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = __importDefault(require("./middlewares"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Session configuration
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
// CORS configuration
const corsOptions = {
    origin: ["http://localhost:3000"]
};
app.use((0, cors_1.default)(corsOptions));
// Body parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use("/", routes_1.default);
app.use("/graphql", middlewares_1.default);
// Proxy middleware
app.use("/api", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: "http://192.168.43.113:3000/",
    changeOrigin: true,
}));
// Database connection error handling
db_1.default.on("error", console.error.bind(console, "Mongodb Connection Error:"));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
exports.default = app;
