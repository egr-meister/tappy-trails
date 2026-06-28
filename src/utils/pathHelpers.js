import { isSameCell } from "./mazeHelpers";

/**
 * Helpers for the correct path and gentle hints. A hint reveals only a
 * few upcoming cells and never auto-completes the level.
 */

/**
 * The full correct path for a level. Always an array.
 */
export function getCorrectPath(level) {
  const path = level?.correctPath ?? [];
  return Array.isArray(path) ? path : [];
}

/**
 * The index of a cell within the correct path, or -1 if not on it.
 */
function getPathIndex(level, cell) {
  const path = getCorrectPath(level);
  if (!cell) return -1;
  return path.findIndex((p) => isSameCell(p, cell));
}

/**
 * Given the current position, return the single next cell on the correct
 * path, or null if there is no next cell (already at goal / off path).
 */
export function getNextPathCell(level, currentPosition) {
  const path = getCorrectPath(level);
  if (path.length === 0) return null;

  const index = getPathIndex(level, currentPosition);
  if (index < 0) {
    // Not on the path: point back to the first path cell as a gentle nudge.
    return path[0] ?? null;
  }
  return path[index + 1] ?? null;
}

/**
 * Return up to N upcoming hint cells based on difficulty.
 *   easy   -> up to 3 cells
 *   medium -> up to 2 cells
 *   hard   -> 1 cell
 * Never returns undefined; never includes the goal-completing auto-finish
 * beyond the allowed count.
 */
export function getHintCells(level, currentPosition, difficulty) {
  const path = getCorrectPath(level);
  if (path.length === 0) return [];

  let maxCells = 1;
  if (difficulty === "easy") maxCells = 3;
  else if (difficulty === "medium") maxCells = 2;
  else maxCells = 1;

  let index = getPathIndex(level, currentPosition);
  if (index < 0) {
    // Off path: gently show the very first step(s).
    return path.slice(0, maxCells);
  }

  const upcoming = path.slice(index + 1, index + 1 + maxCells);
  return upcoming ?? [];
}

/**
 * True if the given cell lies anywhere on the correct path.
 */
export function isCellOnCorrectPath(level, cell) {
  return getPathIndex(level, cell) >= 0;
}
