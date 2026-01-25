import express from "express";
import { getWeeklyVolume } from "../controllers/volumeController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/weekly", requireAuth, getWeeklyVolume);

export default router;
