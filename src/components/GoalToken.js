import React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { getGoalItem } from "../data/goalItems";

/**
 * The friendly destination token (carrot, little house, or star) shown on
 * the goal cell with a soft glow ring.
 */
export default function GoalToken({ goalId, size = 40 }) {
  const goal = getGoalItem(goalId);
  const circle = Math.max(size, 28);

  return (
    <View
      style={[
        styles.glow,
        {
          width: circle + 8,
          height: circle + 8,
          borderRadius: (circle + 8) / 2,
        },
      ]}
    >
      <View
        style={[
          styles.token,
          {
            width: circle,
            height: circle,
            borderRadius: circle / 2,
          },
        ]}
      >
        <Text style={{ fontSize: circle * 0.6 }}>{goal?.emoji ?? "⭐"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.goalStar,
    opacity: 0.95,
  },
  token: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.pathDark,
  },
});
