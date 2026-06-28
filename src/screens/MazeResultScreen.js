import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import ResultCard from "../components/ResultCard";
import { getMazeLevel, getNextLevel } from "../data/mazeLevels";
import { getCharacterItem } from "../data/characterItems";
import { getGoalItem } from "../data/goalItems";
import { recordMazeLevelResult, loadAppData } from "../storage/appStorage";

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

/**
 * Shows level completion and saves progress locally exactly once. No coins,
 * bonuses, jackpots, or money rewards — just friendly progress markers.
 */
export default function MazeResultScreen({ navigation, route }) {
  const characterId = route?.params?.characterId ?? "bunny";
  const levelId = route?.params?.levelId ?? "easy_1";
  const difficulty = route?.params?.difficulty ?? "easy";
  const moves = route?.params?.moves ?? 0;
  const hintsUsed = route?.params?.hintsUsed ?? 0;
  const completedAt = route?.params?.completedAt ?? null;

  const level = getMazeLevel(levelId);
  const character = getCharacterItem(characterId);
  const goal = getGoalItem(level?.goalId);
  const nextLevel = getNextLevel(levelId);

  const [animationEnabled, setAnimationEnabled] = useState(true);
  const savedRef = useRef(false);

  useEffect(() => {
    let active = true;
    loadAppData().then((loaded) => {
      if (active) {
        setAnimationEnabled(loaded?.settings?.moveAnimationEnabled ?? true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Save the result exactly once.
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    recordMazeLevelResult({
      levelId,
      characterId,
      difficulty,
      moves,
      hintsUsed,
      completedAt,
    });
  }, [levelId, characterId, difficulty, moves, hintsUsed, completedAt]);

  const onNextTrail = () => {
    if (nextLevel) {
      navigation.replace("TrailMaze", {
        characterId,
        levelId: nextLevel.id,
        difficulty: nextLevel.difficulty,
      });
    } else {
      navigation.navigate("LevelPicker", { characterId });
    }
  };

  return (
    <ScreenContainer>
      <ResultCard
        character={character}
        goal={goal}
        levelTitle={level?.title ?? "Trail"}
        difficultyLabel={DIFFICULTY_LABELS[difficulty] ?? "Easy"}
        moves={moves}
        hintsUsed={hintsUsed}
        animationEnabled={animationEnabled}
      />

      <View style={styles.buttons}>
        <AppButton
          title={nextLevel ? "Next Trail" : "More Trails"}
          emoji="➡️"
          variant="primary"
          onPress={onNextTrail}
        />
        <AppButton
          title="Choose Trail"
          emoji="🗺️"
          variant="soft"
          onPress={() => navigation.navigate("LevelPicker", { characterId })}
        />
        <AppButton
          title="My Progress"
          emoji="📊"
          variant="soft"
          onPress={() => navigation.navigate("TrailProgress")}
        />
        <AppButton
          title="Home"
          emoji="🏠"
          variant="soft"
          onPress={() => navigation.navigate("TappyHome")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 18,
  },
});
