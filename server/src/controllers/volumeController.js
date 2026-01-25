import { calculateWeeklyVolume } from "../services/volumeService.js";

export async function getWeeklyVolume(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "start and end dates required" });
  }

  const volume = await calculateWeeklyVolume({
    userId: req.userId,
    startDate: start,
    endDate: end
  });

  res.json({
    userId: req.userId,
    start,
    end,
    volumeByMuscle: volume
  });
}
