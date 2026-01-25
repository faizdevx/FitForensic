import { calculateWeeklyVolume } from "../services/volumeService.js";
import { calculateWeeklyProteinStats } from "../services/proteinService.js";
import { calculateWeeklySleepStats } from "../services/sleepService.js";
import { calculateRecoveryScore } from "../services/recoveryService.js";
import User from "../models/User.js";

export async function getWeeklyRecovery(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      error: "start and end required"
    });
  }

  const user = await User.findById(req.userId);
  if (!user || !user.weightKg) {
    return res.status(400).json({
      error: "User weightKg required"
    });
  }

  const volumeByMuscle = await calculateWeeklyVolume({
    userId: req.userId,
    startDate: start.trim(),
    endDate: end.trim()
  });

  const hasTraining =
    Object.keys(volumeByMuscle).length > 0;

  const proteinStats = await calculateWeeklyProteinStats({
    userId: req.userId,
    startDate: start.trim(),
    endDate: end.trim(),
    requiredProtein: Math.round(user.weightKg * 1.8)
  });

  const sleepStats = await calculateWeeklySleepStats({
    userId: req.userId,
    startDate: start.trim(),
    endDate: end.trim()
  });

  const recovery = calculateRecoveryScore({
    sleepDebt: sleepStats.sleepDebt,
    proteinAdequacy: proteinStats.adequacyRatio,
    hasTraining
  });

  res.json({
    userId: req.userId,
    start,
    end,
    recovery,
    inputs: {
      sleep: sleepStats,
      protein: proteinStats,
      volumeByMuscle
    }
  });
}
