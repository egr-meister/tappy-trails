import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

/**
 * A single achievement badge. Locked badges are softly greyed; unlocked
 * badges are bright. Badges are local progress markers only and have no
 * monetary value.
 *
 * Props:
 *   - achievement: { label, emoji, description }
 *   - unlocked: boolean
 */
export default function AchievementBadge({ achievement, unlocked = false }) {
  if (!achievement) return null;

  return (
    <View
      style={[
        styles.badge,
        unlocked ? styles.badgeUnlocked : styles.badgeLocked,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: unlocked ? colors.accent : "#E7EAE0" },
        ]}
      >
        <Text style={[styles.emoji, !unlocked && styles.dim]}>
          {unlocked ? achievement.emoji ?? "🏅" : "🔒"}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.label, !unlocked && styles.lockedText]}>
          {achievement.label ?? "Badge"}
        </Text>
        <Text style={styles.desc}>{achievement.description ?? ""}</Text>
        <Text style={[styles.state, unlocked && styles.stateDone]}>
          {unlocked ? "Unlocked" : "Keep going"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    padding: 14,
    marginVertical: 7,
    backgroundColor: colors.card,
  },
  badgeUnlocked: {
    borderColor: colors.accent,
  },
  badgeLocked: {
    borderColor: colors.border,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 28,
  },
  dim: {
    opacity: 0.6,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  label: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  lockedText: {
    color: colors.mutedText,
  },
  desc: {
    fontSize: 14,
    color: colors.mutedText,
    marginTop: 2,
  },
  state: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.mutedText,
    marginTop: 4,
  },
  stateDone: {
    color: colors.success,
  },
});
