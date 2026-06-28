import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";

/**
 * A selectable trail-friend card.
 *
 * Props:
 *   - character: { label, emoji, description, color }
 *   - completedCount: how many trails finished with this friend
 *   - selected: whether this card is currently chosen
 *   - onPress: select handler
 */
export default function CharacterCard({
  character,
  completedCount = 0,
  selected = false,
  onPress,
}) {
  if (!character) return null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={character.label}
      style={({ pressed }) => [
        styles.card,
        { borderColor: selected ? colors.primary : colors.border },
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.avatar,
          { backgroundColor: character.color ?? colors.bunnyPink },
        ]}
      >
        <Text style={styles.emoji}>{character.emoji ?? "🐰"}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{character.label ?? "Friend"}</Text>
        <Text style={styles.desc}>{character.description ?? ""}</Text>
        <Text style={styles.count}>
          Trails completed: {completedCount}
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
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  desc: {
    fontSize: 14,
    color: colors.mutedText,
    marginTop: 2,
  },
  count: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 4,
    fontWeight: "700",
  },
  check: {
    fontSize: 22,
    marginLeft: 8,
  },
});
