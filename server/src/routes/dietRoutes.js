import express from "express";
import {
  upsertDietLog,
  getWeeklyProtein
} from "../controllers/dietController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, upsertDietLog);
router.get("/weekly", requireAuth, getWeeklyProtein);

export default router;
