import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { getCompletionAnimationConfig } from "../utils/animationHelpers";

/**
 * The celebration card on the result screen. A happy character surrounded
 * by soft leaves and stars, with a friendly success message and a summary.
 *
 * Props:
 *   - character: { emoji, label }
 *   - goal: { emoji, label }
 *   - levelTitle, difficultyLabel
 *   - moves, hintsUsed
 *   - animationEnabled
 */
export default function ResultCard({
  character,
  goal,
  levelTitle = "Trail",
  difficultyLabel = "Easy",
  moves = 0,
  hintsUsed = 0,
  animationEnabled = true,
}) {
  const pop = useRef(new Animated.Value(animationEnabled ? 0 : 1)).current;

  useEffect(() => {
    if (animationEnabled) {
      Animated.spring(pop, getCompletionAnimationConfig()).start();
    } else {
      pop.setValue(1);
    }
  }, [animationEnabled, pop]);

  const scale = pop.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <View style={styles.card}>
      <View style={styles.decorRow}>
        <Text style={styles.decor}>🌿</Text>
        <Text style={styles.decor}>⭐</Text>
        <Text style={styles.decor}>🌿</Text>
      </View>

      <Animated.View style={[styles.heroRow, { transform: [{ scale }] }]}>
        <Text style={styles.heroEmoji}>{character?.emoji ?? "🐰"}</Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.heroEmoji}>{goal?.emoji ?? "⭐"}</Text>
      </Animated.View>

      <Text style={styles.title}>Trail complete!</Text>
      <Text style={styles.subtitle}>Well done — great job on the trail.</Text>

      <View style={styles.summary}>
        <SummaryRow label="Friend" value={character?.label ?? "Friend"} />
        <SummaryRow label="Level" value={levelTitle} />
        <SummaryRow label="Difficulty" value={difficultyLabel} />
        <SummaryRow label="Moves" value={String(moves)} />
        <SummaryRow label="Hints" value={String(hintsUsed)} />
      </View>
    </View>
  );
}

function SummaryRow({ label, value }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20,
    alignItems: "center",
  },
  decorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  decor: {
    fontSize: 22,
    opacity: 0.85,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  heroEmoji: {
    fontSize: 56,
    marginHorizontal: 10,
  },
  arrow: {
    fontSize: 28,
    color: colors.mutedText,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginTop: 4,
    marginBottom: 12,
    textAlign: "center",
  },
  summary: {
    alignSelf: "stretch",
    backgroundColor: colors.board,
    borderRadius: 14,
    padding: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.mutedText,
    fontWeight: "700",
  },
  summaryValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "800",
  },
});
