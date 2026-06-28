import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

/**
 * A small stat tile showing a label, a value, and an optional emoji.
 *
 * Props:
 *   - label: stat name
 *   - value: stat value (number or string)
 *   - emoji: optional leading emoji
 */
export default function StatCard({ label, value, emoji }) {
  return (
    <View style={styles.card}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={styles.value}>{value ?? 0}</Text>
      <Text style={styles.label}>{label ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    minWidth: 96,
    flexGrow: 1,
  },
  emoji: {
    fontSize: 22,
    marginBottom: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 2,
    textAlign: "center",
    fontWeight: "700",
  },
});
