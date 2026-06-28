import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

/**
 * A friendly empty / fallback state used when there is nothing to show yet
 * or expected data is missing. Keeps the app calm instead of crashing.
 *
 * Props:
 *   - emoji: large friendly emoji (default seedling)
 *   - title: short heading
 *   - message: supporting line
 */
export default function EmptyState({
  emoji = "🌱",
  title = "Nothing here yet",
  message = "",
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 26,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: colors.mutedText,
    textAlign: "center",
    marginTop: 6,
  },
});
