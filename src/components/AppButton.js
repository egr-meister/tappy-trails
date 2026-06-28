import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import colors from "../theme/colors";

/**
 * Large, rounded, child-friendly button with a big tap target.
 *
 * Props:
 *   - title: button label
 *   - onPress: press handler
 *   - variant: "primary" | "secondary" | "accent" | "soft" | "danger"
 *   - emoji: optional leading emoji
 *   - disabled: disables the button
 */
export default function AppButton({
  title,
  onPress,
  variant = "primary",
  emoji,
  disabled = false,
}) {
  const palette = getPalette(variant);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, { color: palette.text }]}>
        {emoji ? `${emoji}  ` : ""}
        {title ?? ""}
      </Text>
    </Pressable>
  );
}

function getPalette(variant) {
  switch (variant) {
    case "secondary":
      return { bg: colors.secondary, border: colors.secondary, text: "#FFFFFF" };
    case "accent":
      return { bg: colors.accent, border: colors.pathDark, text: colors.text };
    case "soft":
      return { bg: colors.card, border: colors.border, text: colors.text };
    case "danger":
      return { bg: colors.danger, border: colors.danger, text: "#FFFFFF" };
    case "primary":
    default:
      return { bg: colors.primary, border: colors.primary, text: "#FFFFFF" };
  }
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },
});
