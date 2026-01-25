import SleepLog from "../models/SleepLog.js";
import { calculateWeeklySleepStats } from "../services/sleepService.js";

export async function upsertSleepLog(req, res) {
  const { date, sleepHours, sleepQuality } = req.body;

  if (!date || sleepHours == null) {
    return res.status(400).json({
      error: "date and sleepHours are required"
    });
  }

  const log = await SleepLog.findOneAndUpdate(
    { userId: req.userId, date },
    { sleepHours, sleepQuality },
    { upsert: true, new: true }
  );

  res.json(log);
}

export async function getWeeklySleep(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      error: "start and end required"
    });
  }

  const stats = await calculateWeeklySleepStats({
    userId: req.userId,
    startDate: start.trim(),
    endDate: end.trim()
  });

  res.json({
    userId: req.userId,
    start,
    end,
    ...stats
  });
}
