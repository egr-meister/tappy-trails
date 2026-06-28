/**
 * Local statistics helpers. All values are non-negative integers. The
 * functions are defensive and never return NaN or undefined.
 */

/**
 * The default stats shape for a fresh install.
 */
export function createDefaultStats() {
  return {
    completedLevels: 0,
    totalMoves: 0,
    hintsUsed: 0,
    byDifficulty: {
      easy: { completed: 0 },
      medium: { completed: 0 },
      hard: { completed: 0 },
    },
    byCharacter: {
      bunny: { completed: 0 },
      turtle: { completed: 0 },
      puppy: { completed: 0 },
      robot: { completed: 0 },
    },
  };
}

function toCount(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.floor(num);
}

/**
 * Merge a (possibly partial) stats object with defaults.
 */
function mergeStats(stats) {
  const base = createDefaultStats();
  if (!stats || typeof stats !== "object") return base;

  return {
    completedLevels: toCount(stats.completedLevels),
    totalMoves: toCount(stats.totalMoves),
    hintsUsed: toCount(stats.hintsUsed),
    byDifficulty: {
      easy: { completed: toCount(stats.byDifficulty?.easy?.completed) },
      medium: { completed: toCount(stats.byDifficulty?.medium?.completed) },
      hard: { completed: toCount(stats.byDifficulty?.hard?.completed) },
    },
    byCharacter: {
      bunny: { completed: toCount(stats.byCharacter?.bunny?.completed) },
      turtle: { completed: toCount(stats.byCharacter?.turtle?.completed) },
      puppy: { completed: toCount(stats.byCharacter?.puppy?.completed) },
      robot: { completed: toCount(stats.byCharacter?.robot?.completed) },
    },
  };
}

/**
 * Return NEW stats after recording a completed level result.
 *
 * result shape: { difficulty, characterId, moves, hintsUsed }
 */
export function recordCompletedLevel(stats, result) {
  const next = mergeStats(stats);
  const safeResult = result ?? {};

  const moves = toCount(safeResult.moves);
  const hints = toCount(safeResult.hintsUsed);
  const difficulty = safeResult.difficulty;
  const characterId = safeResult.characterId;

  next.completedLevels += 1;
  next.totalMoves += moves;
  next.hintsUsed += hints;

  if (next.byDifficulty[difficulty]) {
    next.byDifficulty[difficulty].completed += 1;
  }
  if (next.byCharacter[characterId]) {
    next.byCharacter[characterId].completed += 1;
  }

  return next;
}

export function getTotalCompletedLevels(stats) {
  return toCount(stats?.completedLevels);
}

export function getTotalMoves(stats) {
  return toCount(stats?.totalMoves);
}

export function getTotalHintsUsed(stats) {
  return toCount(stats?.hintsUsed);
}

/**
 * Return a fresh default stats object (used by reset flows).
 */
export function resetStats() {
  return createDefaultStats();
}
