const baseXp = 0.5;

const findPointsToLevelUp = (level: number) => {
  return Math.ceil(Math.pow(level / baseXp, 2));
};

const findCurrentLevel = (xp: number) => {
  return Math.floor(baseXp * Math.sqrt(xp));
};

const progressToNextLevel = (xp: number) => {
  const currentLevel = findCurrentLevel(xp);
  const currentProgress = xp - findPointsToLevelUp(currentLevel);
  const pointsForNextLevel =
    findPointsToLevelUp(currentLevel + 1) - findPointsToLevelUp(currentLevel);
  const percent = Math.floor((currentProgress / pointsForNextLevel) * 100);
  return { percent, currentLevel, xp, pointsForNextLevel, currentProgress };
};

export { progressToNextLevel };
