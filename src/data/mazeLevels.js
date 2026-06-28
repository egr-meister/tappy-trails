/**
 * Static maze level data for Tappy Trails.
 *
 * Cell types: "start", "goal", "path", "grass".
 * - "start", "goal" and "path" cells are walkable / tappable.
 * - "grass" cells are friendly scenery and are not walkable.
 *
 * Every level has exactly one start cell, exactly one goal cell, and a
 * verified `correctPath` from start to goal that only steps one cell at a
 * time (up / down / left / right) with no diagonal moves and no gaps.
 *
 * 12 levels total: 4 easy (3x3), 4 medium (4x4), 4 hard (5x5).
 */
export const MAZE_LEVELS = [
  // ---------------------------- EASY (3x3) ----------------------------
  {
    id: "easy_1",
    title: "Trail 1",
    difficulty: "easy",
    gridSize: 3,
    goalId: "carrot",
    start: { row: 0, col: 0 },
    goal: { row: 2, col: 2 },
    grid: [
      ["start", "path", "path"],
      ["grass", "grass", "path"],
      ["grass", "grass", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: "easy_2",
    title: "Trail 2",
    difficulty: "easy",
    gridSize: 3,
    goalId: "star",
    start: { row: 0, col: 0 },
    goal: { row: 2, col: 2 },
    grid: [
      ["start", "grass", "grass"],
      ["path", "grass", "grass"],
      ["path", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: "easy_3",
    title: "Trail 3",
    difficulty: "easy",
    gridSize: 3,
    goalId: "home",
    start: { row: 0, col: 0 },
    goal: { row: 2, col: 2 },
    grid: [
      ["start", "path", "grass"],
      ["grass", "path", "grass"],
      ["grass", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: "easy_4",
    title: "Trail 4",
    difficulty: "easy",
    gridSize: 3,
    goalId: "carrot",
    start: { row: 0, col: 0 },
    goal: { row: 2, col: 2 },
    grid: [
      ["start", "grass", "grass"],
      ["path", "path", "path"],
      ["grass", "grass", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  },

  // --------------------------- MEDIUM (4x4) ---------------------------
  {
    id: "medium_1",
    title: "Trail 5",
    difficulty: "medium",
    gridSize: 4,
    goalId: "carrot",
    start: { row: 0, col: 0 },
    goal: { row: 3, col: 3 },
    grid: [
      ["start", "path", "path", "grass"],
      ["grass", "grass", "path", "grass"],
      ["grass", "path", "path", "grass"],
      ["grass", "path", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ],
  },
  {
    id: "medium_2",
    title: "Trail 6",
    difficulty: "medium",
    gridSize: 4,
    goalId: "home",
    start: { row: 0, col: 0 },
    goal: { row: 3, col: 3 },
    grid: [
      ["start", "grass", "grass", "grass"],
      ["path", "path", "path", "grass"],
      ["grass", "grass", "path", "grass"],
      ["grass", "grass", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ],
  },
  {
    id: "medium_3",
    title: "Trail 7",
    difficulty: "medium",
    gridSize: 4,
    goalId: "star",
    start: { row: 0, col: 0 },
    goal: { row: 3, col: 3 },
    grid: [
      ["start", "path", "path", "path"],
      ["grass", "grass", "grass", "path"],
      ["grass", "grass", "grass", "path"],
      ["grass", "grass", "grass", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ],
  },
  {
    id: "medium_4",
    title: "Trail 8",
    difficulty: "medium",
    gridSize: 4,
    goalId: "carrot",
    start: { row: 0, col: 0 },
    goal: { row: 3, col: 3 },
    grid: [
      ["start", "path", "grass", "grass"],
      ["grass", "path", "path", "path"],
      ["grass", "grass", "grass", "path"],
      ["grass", "grass", "grass", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
    ],
  },

  // ---------------------------- HARD (5x5) ----------------------------
  {
    id: "hard_1",
    title: "Trail 9",
    difficulty: "hard",
    gridSize: 5,
    goalId: "star",
    start: { row: 0, col: 0 },
    goal: { row: 4, col: 4 },
    grid: [
      ["start", "path", "path", "grass", "grass"],
      ["grass", "grass", "path", "path", "grass"],
      ["grass", "grass", "grass", "path", "grass"],
      ["grass", "path", "path", "path", "grass"],
      ["grass", "path", "grass", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
  },
  {
    id: "hard_2",
    title: "Trail 10",
    difficulty: "hard",
    gridSize: 5,
    goalId: "home",
    start: { row: 0, col: 0 },
    goal: { row: 4, col: 4 },
    grid: [
      ["start", "grass", "grass", "grass", "grass"],
      ["path", "grass", "grass", "grass", "grass"],
      ["path", "path", "path", "grass", "grass"],
      ["grass", "path", "path", "grass", "grass"],
      ["grass", "grass", "path", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
  },
  {
    id: "hard_3",
    title: "Trail 11",
    difficulty: "hard",
    gridSize: 5,
    goalId: "star",
    start: { row: 0, col: 0 },
    goal: { row: 4, col: 4 },
    grid: [
      ["start", "path", "path", "path", "path"],
      ["grass", "grass", "grass", "grass", "path"],
      ["grass", "grass", "path", "path", "path"],
      ["grass", "grass", "path", "grass", "grass"],
      ["grass", "grass", "path", "path", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 1, col: 4 },
      { row: 2, col: 4 },
      { row: 2, col: 3 },
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
  },
  {
    id: "hard_4",
    title: "Trail 12",
    difficulty: "hard",
    gridSize: 5,
    goalId: "home",
    start: { row: 0, col: 0 },
    goal: { row: 4, col: 4 },
    grid: [
      ["start", "grass", "grass", "grass", "grass"],
      ["path", "path", "path", "grass", "grass"],
      ["grass", "grass", "path", "path", "path"],
      ["grass", "grass", "path", "grass", "path"],
      ["grass", "grass", "grass", "grass", "goal"],
    ],
    correctPath: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 3, col: 4 },
      { row: 4, col: 4 },
    ],
  },
];

/**
 * Find a level by id. Returns null when missing so callers can show a
 * safe empty state instead of crashing.
 */
export function getMazeLevel(levelId) {
  if (!levelId) return null;
  return MAZE_LEVELS.find((level) => level.id === levelId) ?? null;
}

/**
 * Return all levels for a given difficulty. Always returns an array.
 */
export function getLevelsByDifficulty(difficulty) {
  if (!difficulty) return MAZE_LEVELS.slice();
  return MAZE_LEVELS.filter((level) => level.difficulty === difficulty);
}

/**
 * Return the next level after the given one (by list order), or null if
 * the given level is the last one or cannot be found.
 */
export function getNextLevel(levelId) {
  const index = MAZE_LEVELS.findIndex((level) => level.id === levelId);
  if (index < 0) return null;
  return MAZE_LEVELS[index + 1] ?? null;
}
