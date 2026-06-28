/**
 * Trail friends the child can choose from.
 * Pure static data, no network or external assets.
 */
export const CHARACTER_ITEMS = [
  {
    id: "bunny",
    label: "Bunny",
    emoji: "🐰",
    description: "Hop along the trail.",
    color: "#FFADAD",
    helperName: "Bun",
  },
  {
    id: "turtle",
    label: "Turtle",
    emoji: "🐢",
    description: "Walk calmly through the path.",
    color: "#70C1B3",
    helperName: "Shelly",
  },
  {
    id: "puppy",
    label: "Puppy",
    emoji: "🐶",
    description: "Find the way home.",
    color: "#F9844A",
    helperName: "Pip",
  },
  {
    id: "robot",
    label: "Robot",
    emoji: "🤖",
    description: "Beep along the trail.",
    color: "#4D96FF",
    helperName: "Beep",
  },
];

/**
 * Find a character by id. Falls back to Bunny so screens never crash
 * when a route param or stored value is missing.
 */
export function getCharacterItem(characterId) {
  const safeId = characterId ?? "bunny";
  const found = CHARACTER_ITEMS.find((item) => item.id === safeId);
  return found ?? CHARACTER_ITEMS[0];
}
