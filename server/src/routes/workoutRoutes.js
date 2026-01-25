import express from "express";
import { createWorkoutLog, getWorkoutLogs } from "../controllers/workoutController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, createWorkoutLog);
router.get("/", requireAuth, getWorkoutLogs);

export default router;
