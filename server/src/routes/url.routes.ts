import { Router } from "express";

const router = Router()

router.post("/shorten", (req, res) => {
  res.status(201).json({ 
    success: true, 
    message: "Short link created successfully!" 
  });
});

export default router