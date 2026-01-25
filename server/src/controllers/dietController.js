import DietLog from "../models/DietLog.js";
import User from "../models/User.js";
import {
  calculateProteinRequirementKg,
  calculateWeeklyProteinStats
} from "../services/proteinService.js";

export async function upsertDietLog(req, res) {
  const { date, proteinGrams, calories, carbs, fats } = req.body;

  if (!date || proteinGrams == null) {
    return res.status(400).json({ error: "date and proteinGrams required" });
  }

  const log = await DietLog.findOneAndUpdate(
    { userId: req.userId, date },
    { proteinGrams, calories, carbs, fats },
    { upsert: true, new: true }
  );

  res.json(log);
}

export async function getWeeklyProtein(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "start and end required" });
  }

  const user = await User.findById(req.userId);
  
if (!user.weightKg) {
  return res.status(400).json({
    error: "User weightKg is required to calculate protein requirement"
  });
}

const requiredProtein = calculateProteinRequirementKg(user.weightKg);

  const stats = await calculateWeeklyProteinStats({
    userId: req.userId,
    startDate: start,
    endDate: end,
    requiredProtein
  });

  res.json({
    userId: req.userId,
    start,
    end,
    ...stats
  });
}
