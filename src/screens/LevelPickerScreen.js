import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import LevelCard from "../components/LevelCard";
import colors from "../theme/colors";
import { MAZE_LEVELS } from "../data/mazeLevels";
import { getGoalItem } from "../data/goalItems";
import { getCharacterItem } from "../data/characterItems";
import { loadAppData } from "../storage/appStorage";

const DIFFICULTY_SECTIONS = [
  { key: "easy", label: "Easy trails · 3×3" },
  { key: "medium", label: "Medium trails · 4×4" },
  { key: "hard", label: "Hard trails · 5×5" },
];

/**
 * Lets the child pick a trail. A level must be selected before starting.
 */
export default function LevelPickerScreen({ navigation, route }) {
  const characterId = route?.params?.characterId ?? "bunny";
  const character = getCharacterItem(characterId);

  const [selectedId, setSelectedId] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((loaded) => {
        if (active) {
          setCompletedIds(loaded?.progress?.completedLevelIds ?? []);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const onStart = () => {
    if (!selectedId) {
      setError("Please choose a trail.");
      return;
    }
    const level = MAZE_LEVELS.find((l) => l.id === selectedId);
    setError("");
    navigation.navigate("TrailMaze", {
      characterId,
      levelId: selectedId,
      difficulty: level?.difficulty ?? "easy",
    });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Pick a trail</Text>
      <Text style={styles.subtitle}>
        {character?.emoji ?? "🐰"} {character?.label ?? "Friend"} is ready to
        walk.
      </Text>

      {DIFFICULTY_SECTIONS.map((section) => {
        const levels = MAZE_LEVELS.filter(
          (l) => l.difficulty === section.key
        );
        return (
          <View key={section.key} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.label}</Text>
            {levels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                goal={getGoalItem(level.goalId)}
                completed={completedIds.includes(level.id)}
                selected={selectedId === level.id}
                onPress={() => {
                  setSelectedId(level.id);
                  setError("");
                }}
              />
            ))}
          </View>
        );
      })}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttons}>
        <AppButton
          title="Start Level"
          emoji="🌟"
          variant="primary"
          onPress={onStart}
        />
        <AppButton
          title="Back"
          emoji="⬅️"
          variant="soft"
          onPress={() => navigation.goBack()}
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
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  error: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  buttons: {
    marginTop: 14,
  },
});
