/**
 * Local achievement badges. These are simple progress markers only.
 * They have no monetary value and are never tied to coins, prizes, or money.
 */
export const ACHIEVEMENT_ITEMS = [
  {
    id: "first_trail",
    label: "First Trail Badge",
    emoji: "🏅",
    description: "Complete your first trail.",
    isUnlocked: (stats) => getCompleted(stats) >= 1,
  },
  {
    id: "bunny_trail",
    label: "Bunny Trail Badge",
    emoji: "🐰",
    description: "Complete 2 trails with Bunny.",
    isUnlocked: (stats) => getByCharacter(stats, "bunny") >= 2,
  },
  {
    id: "turtle_path",
    label: "Turtle Path Badge",
    emoji: "🐢",
    description: "Complete 2 trails with Turtle.",
    isUnlocked: (stats) => getByCharacter(stats, "turtle") >= 2,
  },
  {
    id: "puppy_home",
    label: "Puppy Home Badge",
    emoji: "🐶",
    description: "Complete 2 trails with Puppy.",
    isUnlocked: (stats) => getByCharacter(stats, "puppy") >= 2,
  },
  {
    id: "robot_route",
    label: "Robot Route Badge",
    emoji: "🤖",
    description: "Complete 2 trails with Robot.",
    isUnlocked: (stats) => getByCharacter(stats, "robot") >= 2,
  },
  {
    id: "little_maze_star",
    label: "Little Maze Star",
    emoji: "⭐",
    description: "Complete 10 trails.",
    isUnlocked: (stats) => getCompleted(stats) >= 10,
  },
  {
    id: "trail_helper",
    label: "Trail Helper Badge",
    emoji: "🌿",
    description: "Use 5 path hints.",
    isUnlocked: (stats) => getHints(stats) >= 5,
  },
];

function getCompleted(stats) {
  return stats?.completedLevels ?? 0;
}

function getHints(stats) {
  return stats?.hintsUsed ?? 0;
}

function getByCharacter(stats, characterId) {
  return stats?.byCharacter?.[characterId]?.completed ?? 0;
}

/**
 * Return the list of achievement ids unlocked for the given stats.
 * Always returns an array, even if stats is missing.
 */
export function getUnlockedAchievements(stats) {
  const safeStats = stats ?? {};
  return ACHIEVEMENT_ITEMS.filter((item) => {
    try {
      return item.isUnlocked(safeStats);
    } catch (e) {
      return false;
    }
  }).map((item) => item.id);
}

/**
 * Find a single achievement definition by id.
 */
export function getAchievementItem(achievementId) {
  return ACHIEVEMENT_ITEMS.find((item) => item.id === achievementId) ?? null;
}
