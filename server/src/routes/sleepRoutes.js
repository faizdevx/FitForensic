import express from "express";
import {
  upsertSleepLog,
  getWeeklySleep
} from "../controllers/sleepController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, upsertSleepLog);
router.get("/weekly", requireAuth, getWeeklySleep);

export default router;
