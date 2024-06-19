"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET route for the API "/"
router.get("/", (req, res) => {
    res.json({ message: "Welcome to InsiderAPI" });
});
// Add more routes here
exports.default = router;
