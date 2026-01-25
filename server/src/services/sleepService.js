import SleepLog from "../models/SleepLog.js";

const BASELINE_SLEEP_HOURS = 8;

export async function calculateWeeklySleepStats({
  userId,
  startDate,
  endDate
}) {
  const logs = await SleepLog.find({
    userId,
    date: { $gte: startDate, $lte: endDate }
  });

  let totalSleep = 0;
  let totalDebt = 0;

  for (const log of logs) {
    totalSleep += log.sleepHours;

    if (log.sleepHours < BASELINE_SLEEP_HOURS) {
      totalDebt += (BASELINE_SLEEP_HOURS - log.sleepHours);
    }
  }

  const daysLogged = logs.length;
  const averageSleep =
    daysLogged > 0
      ? Number((totalSleep / daysLogged).toFixed(2))
      : 0;

  return {
    daysLogged,
    totalSleep,
    averageSleep,
    baseline: BASELINE_SLEEP_HOURS,
    sleepDebt: Number(totalDebt.toFixed(2))
  };
}
