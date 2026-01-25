import express from "express";
import { getWeeklyRecovery } from "../controllers/recoveryController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/weekly", requireAuth, getWeeklyRecovery);

export default router;
