import WorkoutLog from "../models/WorkoutLog.js";

const ALLOWED_MUSCLE_GROUPS = [
  "chest",
  "back",
  "legs",
  "shoulders",
  "biceps",
  "triceps",
  "core"
];

export async function createWorkoutLog(req, res) {
  const { date, exercise, muscleGroup, sets } = req.body;

  // 1. Required fields
  if (!date || !exercise || !muscleGroup || !sets) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  // 2. Muscle group validation
  if (!ALLOWED_MUSCLE_GROUPS.includes(muscleGroup)) {
    return res.status(400).json({
      error: "Invalid muscle group"
    });
  }

  // 3. Sets must be a non-empty array
  if (!Array.isArray(sets) || sets.length === 0) {
    return res.status(400).json({
      error: "Sets must be a non-empty array"
    });
  }

  // 4. Validate each set
  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];

    if (
      typeof set.reps !== "number" ||
      typeof set.weight !== "number"
    ) {
      return res.status(400).json({
        error: `Set ${i + 1} must contain numeric reps and weight`
      });
    }

    if (set.reps <= 0) {
      return res.status(400).json({
        error: `Set ${i + 1} reps must be greater than 0`
      });
    }

    if (set.weight < 0) {
      return res.status(400).json({
        error: `Set ${i + 1} weight must be 0 or greater`
      });
    }
  }

  // 5. Create workout log
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

  // Optional date range filter
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
