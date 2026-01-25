import DietLog from "../models/DietLog.js";

export function calculateProteinRequirementKg(weightKg, factor = 1.8) {
  return Math.round(weightKg * factor);
}

export async function calculateWeeklyProteinStats({
  userId,
  startDate,
  endDate,
  requiredProtein
}) {
  const logs = await DietLog.find({
    userId,
    date: { $gte: startDate, $lte: endDate }
  });

  const daysLogged = logs.length;

  const totalProtein = logs.reduce(
    (sum, log) => sum + log.proteinGrams,
    0
  );

  const averageProtein =
    daysLogged > 0 ? Math.round(totalProtein / daysLogged) : 0;

  const adequacyRatio =
    requiredProtein > 0
      ? Number((averageProtein / requiredProtein).toFixed(2))
      : 0;

  return {
    daysLogged,
    totalProtein,
    averageProtein,
    requiredProtein,
    adequacyRatio
  };
}
