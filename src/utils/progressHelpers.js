import { getUnlockedAchievements } from "../data/achievementItems";

/**
 * Local progress helpers. Completed levels and achievements are local
 * progress markers only. They have no monetary value and are never tied
 * to coins, prizes, or money of any kind.
 */

/**
 * The default progress shape.
 */
export function createDefaultProgress() {
  return {
    completedLevelIds: [],
    unlockedAchievementIds: [],
  };
}

function mergeProgress(progress) {
  const base = createDefaultProgress();
  if (!progress || typeof progress !== "object") return base;
  return {
    completedLevelIds: Array.isArray(progress.completedLevelIds)
      ? progress.completedLevelIds.slice()
      : [],
    unlockedAchievementIds: Array.isArray(progress.unlockedAchievementIds)
      ? progress.unlockedAchievementIds.slice()
      : [],
  };
}

/**
 * Return NEW progress with the given level id marked complete (no dupes).
 */
export function markLevelCompleted(progress, levelId) {
  const next = mergeProgress(progress);
  if (!levelId) return next;
  if (!next.completedLevelIds.includes(levelId)) {
    next.completedLevelIds.push(levelId);
  }
  return next;
}

/**
 * Recompute unlocked achievement ids from the current stats and merge
 * them into progress. Returns NEW progress.
 */
export function updateAchievements(progress, stats) {
  const next = mergeProgress(progress);
  const unlocked = getUnlockedAchievements(stats);
  const merged = new Set([...next.unlockedAchievementIds, ...unlocked]);
  next.unlockedAchievementIds = Array.from(merged);
  return next;
}

/**
 * Return the unlocked achievement ids as an array (never undefined).
 */
export function getAchievementIds(progress) {
  return mergeProgress(progress).unlockedAchievementIds;
}

/**
 * Return fresh default progress (used by reset flows).
 */
export function resetProgress() {
  return createDefaultProgress();
}
