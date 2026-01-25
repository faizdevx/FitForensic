// server/src/services/volumeService.js
import WorkoutLog from "../models/WorkoutLog.js";

/**
 * Calculate volume for a single workout log
 */
export function calculateExerciseVolume(sets) {
  return sets.reduce((total, set) => {
    return total + (set.reps * set.weight);
  }, 0);
}

export async function calculateWeeklyVolume({
  userId,
  startDate,
  endDate
}) {
  const logs = await WorkoutLog.find({
    userId,
    date: { $gte: startDate, $lte: endDate }
  });

  const volumeByMuscle = {};

  for (const log of logs) {
    const exerciseVolume = calculateExerciseVolume(log.sets);

    if (!volumeByMuscle[log.muscleGroup]) {
      volumeByMuscle[log.muscleGroup] = 0;
    }

    volumeByMuscle[log.muscleGroup] += exerciseVolume;
  }

  return volumeByMuscle;
}