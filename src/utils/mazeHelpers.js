/**
 * Low-level maze grid helpers. All functions are defensive: they never
 * crash on missing levels, empty grids, or out-of-range cells. Movement
 * is strictly orthogonal (no diagonals).
 */

/**
 * A stable string key for a cell, useful for React keys and lookups.
 */
export function getCellKey(row, col) {
  return `r${row ?? 0}c${col ?? 0}`;
}

/**
 * True if two cells refer to the same row/col.
 */
export function isSameCell(a, b) {
  if (!a || !b) return false;
  return a.row === b.row && a.col === b.col;
}

/**
 * True if two cells are orthogonally adjacent (one step up/down/left/right).
 * Diagonal cells are NOT adjacent.
 */
export function isAdjacentCell(a, b) {
  if (!a || !b) return false;
  const rowDiff = Math.abs((a.row ?? 0) - (b.row ?? 0));
  const colDiff = Math.abs((a.col ?? 0) - (b.col ?? 0));
  return rowDiff + colDiff === 1;
}

/**
 * Return the cell type at row/col, or "grass" if missing / out of range.
 */
export function getCellType(level, row, col) {
  const grid = level?.grid ?? [];
  const gridRow = grid[row];
  if (!gridRow) return "grass";
  const cell = gridRow[col];
  return cell ?? "grass";
}

/**
 * Walkable cells are start, goal, or path.
 */
export function isPathCell(cellType) {
  return (
    cellType === "path" || cellType === "start" || cellType === "goal"
  );
}

export function isGoalCell(cellType) {
  return cellType === "goal";
}

export function isStartCell(cellType) {
  return cellType === "start";
}

/**
 * Grid size of a level, falling back to the grid length or 3.
 */
export function getGridSize(level) {
  if (typeof level?.gridSize === "number" && level.gridSize > 0) {
    return level.gridSize;
  }
  const grid = level?.grid ?? [];
  return grid.length > 0 ? grid.length : 3;
}
