import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import CharacterCard from "../components/CharacterCard";
import colors from "../theme/colors";
import { CHARACTER_ITEMS } from "../data/characterItems";
import { loadAppData } from "../storage/appStorage";

/**
 * Lets the child choose a trail friend. A character must be selected before
 * continuing.
 */
export default function CharacterPickerScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((loaded) => {
        if (active) setStats(loaded?.stats ?? null);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const onContinue = () => {
    if (!selectedId) {
      setError("Please choose a trail friend.");
      return;
    }
    setError("");
    navigation.navigate("LevelPicker", { characterId: selectedId });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Choose a trail friend</Text>
      <Text style={styles.subtitle}>Who will walk the path today?</Text>

      {CHARACTER_ITEMS.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          completedCount={
            stats?.byCharacter?.[character.id]?.completed ?? 0
          }
          selected={selectedId === character.id}
          onPress={() => {
            setSelectedId(character.id);
            setError("");
          }}
        />
      ))}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttons}>
        <AppButton
          title="Continue"
          emoji="➡️"
          variant="primary"
          onPress={onContinue}
        />
        <AppButton
          title="Back Home"
          emoji="🏠"
          variant="soft"
          onPress={() => navigation.navigate("TappyHome")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginBottom: 12,
  },
  error: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
  },
  buttons: {
    marginTop: 12,
  },
});
