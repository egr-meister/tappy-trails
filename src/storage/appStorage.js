import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDefaultStats,
  recordCompletedLevel,
} from "../utils/statsHelpers";
import {
  createDefaultProgress,
  markLevelCompleted,
  updateAchievements,
} from "../utils/progressHelpers";

/**
 * Local-only persistence for Tappy Trails.
 *
 * Everything is stored on the device via AsyncStorage. No personal data,
 * names, ages, locations, device identifiers, or behavioral tracking is
 * ever stored. There is no internet access and no cloud sync.
 */

const STORAGE_KEY = "tappy_trails_app_data_v1";

/**
 * Default settings for a brand new install.
 */
export function createDefaultSettings() {
  return {
    soundEnabled: true,
    defaultDifficulty: "easy",
    pathHintsEnabled: true,
    moveAnimationEnabled: true,
    theme: "tappyTrailGarden",
  };
}

/**
 * The complete default app data shape.
 */
export function createDefaultAppData() {
  return {
    stats: createDefaultStats(),
    progress: createDefaultProgress(),
    settings: createDefaultSettings(),
  };
}

/**
 * Merge stored data on top of defaults so missing or partial data never
 * causes a crash. Unknown / corrupted shapes fall back to defaults.
 */
function mergeWithDefaults(stored) {
  const defaults = createDefaultAppData();
  if (!stored || typeof stored !== "object") {
    return defaults;
  }

  const defaultStats = defaults.stats;
  const storedStats = stored.stats ?? {};

  const mergedStats = {
    completedLevels: storedStats.completedLevels ?? defaultStats.completedLevels,
    totalMoves: storedStats.totalMoves ?? defaultStats.totalMoves,
    hintsUsed: storedStats.hintsUsed ?? defaultStats.hintsUsed,
    byDifficulty: {
      easy: {
        completed:
          storedStats.byDifficulty?.easy?.completed ??
          defaultStats.byDifficulty.easy.completed,
      },
      medium: {
        completed:
          storedStats.byDifficulty?.medium?.completed ??
          defaultStats.byDifficulty.medium.completed,
      },
      hard: {
        completed:
          storedStats.byDifficulty?.hard?.completed ??
          defaultStats.byDifficulty.hard.completed,
      },
    },
    byCharacter: {
      bunny: {
        completed:
          storedStats.byCharacter?.bunny?.completed ??
          defaultStats.byCharacter.bunny.completed,
      },
      turtle: {
        completed:
          storedStats.byCharacter?.turtle?.completed ??
          defaultStats.byCharacter.turtle.completed,
      },
      puppy: {
        completed:
          storedStats.byCharacter?.puppy?.completed ??
          defaultStats.byCharacter.puppy.completed,
      },
      robot: {
        completed:
          storedStats.byCharacter?.robot?.completed ??
          defaultStats.byCharacter.robot.completed,
      },
    },
  };

  const storedProgress = stored.progress ?? {};
  const mergedProgress = {
    completedLevelIds: Array.isArray(storedProgress.completedLevelIds)
      ? storedProgress.completedLevelIds
      : defaults.progress.completedLevelIds,
    unlockedAchievementIds: Array.isArray(storedProgress.unlockedAchievementIds)
      ? storedProgress.unlockedAchievementIds
      : defaults.progress.unlockedAchievementIds,
  };

  const storedSettings = stored.settings ?? {};
  const mergedSettings = {
    soundEnabled:
      storedSettings.soundEnabled ?? defaults.settings.soundEnabled,
    defaultDifficulty:
      storedSettings.defaultDifficulty ?? defaults.settings.defaultDifficulty,
    pathHintsEnabled:
      storedSettings.pathHintsEnabled ?? defaults.settings.pathHintsEnabled,
    moveAnimationEnabled:
      storedSettings.moveAnimationEnabled ??
      defaults.settings.moveAnimationEnabled,
    theme: storedSettings.theme ?? defaults.settings.theme,
  };

  return {
    stats: mergedStats,
    progress: mergedProgress,
    settings: mergedSettings,
  };
}

/**
 * Load app data. Always resolves to a valid, fully-populated object even
 * if storage is empty or the stored JSON is corrupted.
 */
export async function loadAppData() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultAppData();
    }
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch (e) {
    // Corrupted JSON or read error -> safe defaults.
    return createDefaultAppData();
  }
}

/**
 * Save the full app data object. Returns the merged, saved data.
 */
export async function saveAppData(data) {
  const merged = mergeWithDefaults(data);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    // Best-effort save; never crash the UI on a storage error.
  }
  return merged;
}

/**
 * Record a completed maze level. Updates stats, marks the level complete,
 * recomputes unlocked achievements, and persists everything.
 *
 * result shape:
 *   { levelId, characterId, difficulty, moves, hintsUsed, completedAt }
 */
export async function recordMazeLevelResult(result) {
  const data = await loadAppData();
  const safeResult = result ?? {};

  const nextStats = recordCompletedLevel(data.stats, safeResult);

  let nextProgress = markLevelCompleted(
    data.progress,
    safeResult.levelId
  );
  nextProgress = updateAchievements(nextProgress, nextStats);

  const nextData = {
    stats: nextStats,
    progress: nextProgress,
    settings: data.settings,
  };

  return saveAppData(nextData);
}

/**
 * Reset only statistics to defaults, keeping progress and settings.
 */
export async function resetMazeStats() {
  const data = await loadAppData();
  const nextData = {
    stats: createDefaultStats(),
    progress: data.progress,
    settings: data.settings,
  };
  return saveAppData(nextData);
}

/**
 * Reset only progress (completed levels + achievements) to defaults.
 */
export async function resetMazeProgress() {
  const data = await loadAppData();
  const nextData = {
    stats: data.stats,
    progress: createDefaultProgress(),
    settings: data.settings,
  };
  return saveAppData(nextData);
}

/**
 * Update settings, merging the partial update over current settings.
 */
export async function updateSettings(settings) {
  const data = await loadAppData();
  const nextSettings = {
    ...data.settings,
    ...(settings ?? {}),
  };
  const nextData = {
    stats: data.stats,
    progress: data.progress,
    settings: nextSettings,
  };
  return saveAppData(nextData);
}

/**
 * Clear ALL local data: stats, progress, achievements, and settings,
 * then restore defaults. Removes the storage key entirely.
 */
export async function clearAllData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Ignore; we still return defaults below.
  }
  const defaults = createDefaultAppData();
  return saveAppData(defaults);
}
