import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { isPathCell } from "../utils/mazeHelpers";

/**
 * A single maze cell. Walkable cells look like soft stepping stones;
 * grass cells are friendly rounded scenery (not harsh walls). Hint cells
 * show a gentle glow. Large tap targets suit small fingers.
 */
export default function MazeCell({
  cellType = "grass",
  size = 80,
  isHint = false,
  onPress,
  children,
}) {
  const walkable = isPathCell(cellType);
  const inner = size - 8;

  return (
    <Pressable
      onPress={walkable ? onPress : onPress}
      style={[styles.cellOuter, { width: size, height: size }]}
      accessibilityRole={walkable ? "button" : "image"}
    >
      <View
        style={[
          styles.cellInner,
          {
            width: inner,
            height: inner,
            borderRadius: walkable ? inner * 0.32 : inner * 0.42,
            backgroundColor: walkable ? colors.path : colors.grass,
            borderColor: walkable ? colors.pathDark : "#A9CDB6",
          },
          isHint && styles.hintCell,
        ]}
      >
        {!walkable ? <Text style={styles.grassLeaf}>🌿</Text> : null}
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cellOuter: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  cellInner: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  hintCell: {
    backgroundColor: colors.hintGlow,
    borderColor: colors.secondary,
  },
  grassLeaf: {
    fontSize: 16,
    opacity: 0.7,
  },
});
