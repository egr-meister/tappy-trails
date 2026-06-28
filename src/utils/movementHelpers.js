import { getMazeLevel } from "../data/mazeLevels";
import {
  getCellType,
  isAdjacentCell,
  isPathCell,
  isSameCell,
} from "./mazeHelpers";
import { getNowIso } from "./dateUtils";

/**
 * Pure, defensive helpers for moving a character through a maze. There is
 * no timer logic anywhere. Invalid taps never move the character.
 */

let gameCounter = 0;

/**
 * Create a fresh game state for a level + character. Always returns a
 * valid object, even when the level id or character id is missing.
 */
export function createMazeGameState(levelId, characterId) {
  const safeLevelId = levelId ?? "easy_1";
  const safeCharacterId = characterId ?? "bunny";
  const level = getMazeLevel(safeLevelId);

  const start = level?.start ?? { row: 0, col: 0 };

  gameCounter += 1;

  return {
    id: `maze_game_${gameCounter}`,
    levelId: safeLevelId,
    characterId: safeCharacterId,
    currentPosition: { row: start.row ?? 0, col: start.col ?? 0 },
    moves: 0,
    invalidTaps: 0,
    hintsUsed: 0,
    startedAt: getNowIso(),
  };
}

/**
 * True only if target is orthogonally adjacent to the current position and
 * the target cell is a walkable path/goal cell.
 */
export function canMoveToCell(level, currentPosition, targetPosition) {
  if (!level || !currentPosition || !targetPosition) return false;
  if (isSameCell(currentPosition, targetPosition)) return false;
  if (!isAdjacentCell(currentPosition, targetPosition)) return false;

  const targetType = getCellType(level, targetPosition.row, targetPosition.col);
  return isPathCell(targetType);
}

/**
 * Return a NEW game state moved to the target cell, incrementing the move
 * count. If the move is not valid, returns the state unchanged.
 */
export function moveToCell(gameState, targetPosition) {
  if (!gameState) {
    return createMazeGameState();
  }
  const level = getMazeLevel(gameState.levelId);
  if (!canMoveToCell(level, gameState.currentPosition, targetPosition)) {
    return gameState;
  }

  return {
    ...gameState,
    currentPosition: {
      row: targetPosition.row,
      col: targetPosition.col,
    },
    moves: (gameState.moves ?? 0) + 1,
  };
}

/**
 * True only when the current position equals the level's goal cell.
 */
export function isMazeComplete(level, currentPosition) {
  if (!level || !currentPosition) return false;
  const goal = level?.goal;
  if (!goal) return false;
  return isSameCell(goal, currentPosition);
}

/**
 * Record a gentle invalid tap. Increments a counter only; never moves the
 * character and never resets the level.
 */
export function recordInvalidTap(gameState) {
  if (!gameState) {
    return createMazeGameState();
  }
  return {
    ...gameState,
    invalidTaps: (gameState.invalidTaps ?? 0) + 1,
  };
}

/**
 * Record that a hint was used. Hint usage is tracked locally and is never
 * treated as a penalty.
 */
export function useHint(gameState) {
  if (!gameState) {
    return createMazeGameState();
  }
  return {
    ...gameState,
    hintsUsed: (gameState.hintsUsed ?? 0) + 1,
  };
}
