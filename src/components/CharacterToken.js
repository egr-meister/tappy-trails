import React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { getCharacterItem } from "../data/characterItems";

/**
 * The character token that sits on the start cell and walks the trail.
 * Pure View + emoji, no external art.
 */
export default function CharacterToken({ characterId, size = 40 }) {
  const character = getCharacterItem(characterId);
  const circle = Math.max(size, 28);

  return (
    <View
      style={[
        styles.token,
        {
          width: circle,
          height: circle,
          borderRadius: circle / 2,
          backgroundColor: character?.color ?? colors.bunnyPink,
        },
      ]}
    >
      <Text style={{ fontSize: circle * 0.6 }}>{character?.emoji ?? "🐰"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  token: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
