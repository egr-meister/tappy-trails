import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { isPathCell } from "../utils/mazeHelpers";

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

/**
 * A selectable trail level card with a tiny grid preview.
 *
 * Props:
 *   - level: maze level object
 *   - goal: goal item ({ label, emoji })
 *   - completed: whether the level is finished
 *   - selected: whether this card is currently chosen
 *   - onPress: select handler
 */
export default function LevelCard({
  level,
  goal,
  completed = false,
  selected = false,
  onPress,
}) {
  if (!level) return null;

  const grid = level.grid ?? [];
  const size = level.gridSize ?? grid.length ?? 3;
  const difficultyLabel = DIFFICULTY_LABELS[level.difficulty] ?? "Easy";

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${level.title}, ${difficultyLabel}`}
      style={({ pressed }) => [
        styles.card,
        { borderColor: selected ? colors.primary : colors.border },
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.preview}>
        {grid.map((gridRow, r) => (
          <View key={`pr-${r}`} style={styles.previewRow}>
            {(gridRow ?? []).map((cell, c) => (
              <View
                key={`pc-${r}-${c}`}
                style={[
                  styles.previewCell,
                  {
                    backgroundColor: isPathCell(cell)
                      ? cell === "goal"
                        ? colors.goalStar
                        : cell === "start"
                        ? colors.primary
                        : colors.path
                      : colors.grass,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{level.title ?? "Trail"}</Text>
        <Text style={styles.meta}>
          {difficultyLabel} · {size}×{size}
        </Text>
        <Text style={styles.goalLine}>
          Goal: {goal?.emoji ?? "⭐"} {goal?.label ?? "Star"}
        </Text>
        <Text style={[styles.status, completed && styles.statusDone]}>
          {completed ? "✅ Completed" : "Not yet completed"}
        </Text>
      </View>

      {selected ? <Text style={styles.check}>✅</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 2,
    padding: 14,
    marginVertical: 7,
  },
  cardSelected: {
    backgroundColor: "#F2F8EE",
  },
  pressed: {
    opacity: 0.9,
  },
  preview: {
    width: 62,
    height: 62,
    backgroundColor: colors.board,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 3,
    justifyContent: "center",
  },
  previewRow: {
    flexDirection: "row",
    flex: 1,
  },
  previewCell: {
    flex: 1,
    margin: 1,
    borderRadius: 3,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
  },
  meta: {
    fontSize: 14,
    color: colors.mutedText,
    marginTop: 2,
  },
  goalLine: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  status: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 4,
    fontWeight: "700",
  },
  statusDone: {
    color: colors.success,
  },
  check: {
    fontSize: 22,
    marginLeft: 8,
  },
});
