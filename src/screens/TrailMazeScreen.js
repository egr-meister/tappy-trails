import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import MazeGrid from "../components/MazeGrid";
import HintPathOverlay from "../components/HintPathOverlay";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";

import { getMazeLevel } from "../data/mazeLevels";
import { getCharacterItem } from "../data/characterItems";
import { getGoalItem } from "../data/goalItems";
import { loadAppData } from "../storage/appStorage";

import {
  createMazeGameState,
  canMoveToCell,
  moveToCell,
  isMazeComplete,
  recordInvalidTap,
  useHint,
} from "../utils/movementHelpers";
import { getHintCells } from "../utils/pathHelpers";
import {
  playMoveSoundIfEnabled,
  playCompleteSoundIfEnabled,
} from "../utils/soundHelpers";
import {
  enableStickyImmersiveMode,
  activateGameKeepAwake,
  deactivateGameKeepAwake,
} from "../utils/immersiveHelpers";
import { getNowIso } from "../utils/dateUtils";

/**
 * The main game screen. Tap-based movement, gentle hints, no timer, no
 * pressure. Keep-awake is active ONLY while this screen is focused.
 */
export default function TrailMazeScreen({ navigation, route }) {
  const characterId = route?.params?.characterId ?? "bunny";
  const levelId = route?.params?.levelId ?? "easy_1";
  const difficulty = route?.params?.difficulty ?? "easy";

  const level = getMazeLevel(levelId);
  const character = getCharacterItem(characterId);
  const goal = getGoalItem(level?.goalId);

  const [gameState, setGameState] = useState(() =>
    createMazeGameState(levelId, characterId)
  );
  const [hintCells, setHintCells] = useState([]);
  const [feedback, setFeedback] = useState("Tap the next path.");
  const [settings, setSettings] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Load settings once.
  useEffect(() => {
    let active = true;
    loadAppData().then((loaded) => {
      if (active) setSettings(loaded?.settings ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  // Keep-awake + immersive mode only while focused on the maze.
  useFocusEffect(
    useCallback(() => {
      enableStickyImmersiveMode();
      activateGameKeepAwake();
      return () => {
        deactivateGameKeepAwake();
      };
    }, [])
  );

  const hintsEnabled = settings?.pathHintsEnabled ?? true;

  const helperName = character?.helperName ?? "Your friend";

  const onCellPress = (row, col) => {
    if (completed) return;
    const target = { row, col };

    if (canMoveToCell(level, gameState.currentPosition, target)) {
      const nextState = moveToCell(gameState, target);
      setGameState(nextState);
      setHintCells([]);
      setFeedback("Good step!");
      playMoveSoundIfEnabled(settings);

      if (isMazeComplete(level, nextState.currentPosition)) {
        setCompleted(true);
        playCompleteSoundIfEnabled(settings);
        setFeedback("Trail complete!");
        // Small delay so the child sees the friend reach the goal.
        setTimeout(() => {
          navigation.replace("MazeResult", {
            characterId,
            levelId,
            difficulty,
            moves: nextState.moves,
            hintsUsed: nextState.hintsUsed,
            completedAt: getNowIso(),
          });
        }, 650);
      }
    } else {
      setGameState(recordInvalidTap(gameState));
      setFeedback("Try a nearby path.");
    }
  };

  const onHint = () => {
    if (!hintsEnabled) {
      setFeedback("Path hints are turned off in Parent Settings.");
      return;
    }
    const cells = getHintCells(level, gameState.currentPosition, difficulty);
    setHintCells(cells);
    setGameState(useHint(gameState));
    setFeedback(`${helperName} can show the trail.`);
  };

  if (!level || !Array.isArray(level.grid) || level.grid.length === 0) {
    return (
      <ScreenContainer center scroll={false}>
        <EmptyState
          emoji="🌱"
          title="This trail is resting"
          message="That trail could not be found. Let's pick another one."
        />
        <AppButton
          title="Choose Trail"
          emoji="🗺️"
          variant="primary"
          onPress={() => navigation.navigate("LevelPicker", { characterId })}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false}>
      <View style={styles.topRow}>
        <Text style={styles.levelTitle}>{level.title ?? "Trail"}</Text>
        <Text style={styles.goalChip}>
          Goal: {goal?.emoji ?? "⭐"} {goal?.label ?? "Star"}
        </Text>
      </View>

      <Text style={styles.instruction}>
        {character?.emoji ?? "🐰"} Guide {character?.label ?? "your friend"} to
        the goal.
      </Text>

      <HintPathOverlay
        visible={hintCells.length > 0}
        message="Follow the glowing path."
      />

      <View style={styles.gridWrap}>
        <MazeGrid
          level={level}
          currentPosition={gameState.currentPosition}
          hintCells={hintCells}
          characterId={characterId}
          onCellPress={onCellPress}
        />
      </View>

      <Text style={styles.feedback}>{feedback}</Text>

      <View style={styles.statsRow}>
        <Text style={styles.statText}>👣 Moves: {gameState.moves ?? 0}</Text>
        <Text style={styles.statText}>
          ✨ Hints: {gameState.hintsUsed ?? 0}
        </Text>
      </View>

      <View style={styles.buttons}>
        <AppButton
          title="Show a hint"
          emoji="✨"
          variant="accent"
          onPress={onHint}
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },
  goalChip: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    backgroundColor: colors.board,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  instruction: {
    fontSize: 16,
    color: colors.mutedText,
    marginTop: 6,
    marginBottom: 2,
  },
  gridWrap: {
    alignItems: "center",
    marginTop: 6,
  },
  feedback: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.secondary,
    textAlign: "center",
    marginTop: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  statText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginHorizontal: 14,
  },
  buttons: {
    marginTop: 10,
  },
});
