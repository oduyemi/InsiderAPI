import { Router, Request, Response } from "express";

const router = Router();

// GET route for the API "/"
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to InsiderAPI" });
});

// Add more routes here

export default router;
