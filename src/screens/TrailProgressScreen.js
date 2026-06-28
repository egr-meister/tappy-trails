import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import colors from "../theme/colors";
import { CHARACTER_ITEMS } from "../data/characterItems";
import {
  loadAppData,
  resetMazeStats,
  resetMazeProgress,
} from "../storage/appStorage";

/**
 * Local maze statistics. No rankings, no leaderboards — just the child's own
 * trail progress on this device.
 */
export default function TrailProgressScreen({ navigation }) {
  const [data, setData] = useState(null);

  const reload = useCallback(() => {
    let active = true;
    loadAppData().then((loaded) => {
      if (active) setData(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const stats = data?.stats ?? null;
  const completed = stats?.completedLevels ?? 0;
  const hasProgress = completed > 0 || (stats?.totalMoves ?? 0) > 0;

  const onReset = () => {
    Alert.alert(
      "Reset trail progress",
      "Are you sure you want to reset trail progress?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetMazeStats();
            await resetMazeProgress();
            reload();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>My trail progress</Text>

      {hasProgress ? (
        <>
          <View style={styles.statsRow}>
            <StatCard label="Levels completed" value={completed} emoji="✅" />
            <StatCard
              label="Total moves"
              value={stats?.totalMoves ?? 0}
              emoji="👣"
            />
            <StatCard
              label="Hints used"
              value={stats?.hintsUsed ?? 0}
              emoji="✨"
            />
          </View>

          <Text style={styles.sectionTitle}>By difficulty</Text>
          <View style={styles.statsRow}>
            <StatCard
              label="Easy"
              value={stats?.byDifficulty?.easy?.completed ?? 0}
              emoji="🌼"
            />
            <StatCard
              label="Medium"
              value={stats?.byDifficulty?.medium?.completed ?? 0}
              emoji="🌿"
            />
            <StatCard
              label="Hard"
              value={stats?.byDifficulty?.hard?.completed ?? 0}
              emoji="🌳"
            />
          </View>

          <Text style={styles.sectionTitle}>By friend</Text>
          <View style={styles.statsRow}>
            {CHARACTER_ITEMS.map((c) => (
              <StatCard
                key={c.id}
                label={c.label}
                value={stats?.byCharacter?.[c.id]?.completed ?? 0}
                emoji={c.emoji}
              />
            ))}
          </View>
        </>
      ) : (
        <EmptyState
          emoji="🌱"
          title="No trail progress yet"
          message="Finish a trail and your progress will appear here."
        />
      )}

      <View style={styles.buttons}>
        <AppButton
          title="Achievements"
          emoji="🏅"
          variant="primary"
          onPress={() => navigation.navigate("Achievement")}
        />
        <AppButton
          title="Reset Progress"
          emoji="🔄"
          variant="danger"
          onPress={onReset}
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginTop: 14,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttons: {
    marginTop: 18,
  },
});
