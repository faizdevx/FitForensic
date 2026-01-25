// server/src/controllers/workoutController.js
import WorkoutLog from "../models/WorkoutLog.js";

export async function createWorkoutLog(req, res) {
  const { date, exercise, muscleGroup, sets } = req.body;

  if (!date || !exercise || !muscleGroup || !sets) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({ error: "Sets must be a non-empty array" });
  }

  for (const set of sets) {
    if (set.reps <= 0 || set.weight < 0) {
      return res.status(400).json({ error: "Invalid set values" });
    }
  }

  const log = await WorkoutLog.create({
    userId: req.userId,
    date,
    exercise,
    muscleGroup,
    sets
  });

  res.status(201).json(log);
}

export async function getWorkoutLogs(req, res) {
  const { from, to } = req.query;

  const query = {
    userId: req.userId
  };

  if (from && to) {
    query.date = {
      $gte: from,
      $lte: to
    };
  }

  const logs = await WorkoutLog.find(query)
    .sort({ date: 1 });

  res.json(logs);
}
