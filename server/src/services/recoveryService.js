export function calculateRecoveryScore({
  sleepDebt,
  proteinAdequacy,
  hasTraining
}) {
  // Sleep subscore
  let sleepScore = Math.max(0, 100 - sleepDebt * 10);

  // Protein subscore
  let proteinScore = Math.min(
    Math.round(proteinAdequacy * 100),
    100
  );

  // Volume subscore
  let volumeScore = hasTraining ? 100 : 0;

  // Weighted recovery score
  const recoveryScore = Math.round(
    sleepScore * 0.4 +
    proteinScore * 0.3 +
    volumeScore * 0.3
  );

  return {
    recoveryScore,
    breakdown: {
      sleepScore,
      proteinScore,
      volumeScore
    },
    status:
      recoveryScore >= 75
        ? "green"
        : recoveryScore >= 50
        ? "yellow"
        : "red"
  };
}
