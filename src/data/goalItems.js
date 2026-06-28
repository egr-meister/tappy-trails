/**
 * Friendly, safe destination objects placed at the end of each trail.
 * No dangerous or scary destinations.
 */
export const GOAL_ITEMS = [
  { id: "carrot", label: "Carrot", emoji: "🥕" },
  { id: "home", label: "Little House", emoji: "🏠" },
  { id: "star", label: "Star", emoji: "⭐" },
];

/**
 * Find a goal by id. Falls back to the Star so a level always has a
 * safe, friendly destination even if data is missing.
 */
export function getGoalItem(goalId) {
  const safeId = goalId ?? "star";
  const found = GOAL_ITEMS.find((item) => item.id === safeId);
  return found ?? GOAL_ITEMS[2];
}
