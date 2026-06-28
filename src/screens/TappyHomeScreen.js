import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import StatCard from "../components/StatCard";
import colors from "../theme/colors";
import { loadAppData } from "../storage/appStorage";
import { getAchievementIds } from "../utils/progressHelpers";

/**
 * The friendly trail-adventure entrance. Shows a quick progress preview and
 * the main buttons. Reloads data each time it gains focus so the preview
 * stays fresh after playing.
 */
export default function TappyHomeScreen({ navigation }) {
  const [data, setData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((loaded) => {
        if (active) setData(loaded);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const stats = data?.stats ?? null;
  const completed = stats?.completedLevels ?? 0;
  const moves = stats?.totalMoves ?? 0;
  const hints = stats?.hintsUsed ?? 0;
  const achievements = getAchievementIds(data?.progress).length;

  const hasProgress = completed > 0 || moves > 0 || achievements > 0;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Tappy Trails</Text>
        <Text style={styles.subtitle}>
          Tap the path and guide your friend.
        </Text>
      </View>

      <View style={styles.preview}>
        <Text style={styles.friendsRow}>🐰 🐢 🐶 🤖</Text>
        <Text style={styles.previewPath}>· · · ✨ · · · ⭐</Text>
      </View>

      <AppButton
        title="Start Trail"
        emoji="🌿"
        variant="primary"
        onPress={() => navigation.navigate("CharacterPicker")}
      />
      <AppButton
        title="My Progress"
        emoji="📊"
        variant="soft"
        onPress={() => navigation.navigate("TrailProgress")}
      />
      <AppButton
        title="Achievements"
        emoji="🏅"
        variant="soft"
        onPress={() => navigation.navigate("Achievement")}
      />
      <AppButton
        title="Parent Settings"
        emoji="⚙️"
        variant="soft"
        onPress={() => navigation.navigate("ParentSettings")}
      />

      <View style={styles.progressBox}>
        <Text style={styles.progressTitle}>Trail progress</Text>
        {hasProgress ? (
          <View style={styles.statsRow}>
            <StatCard label="Levels completed" value={completed} emoji="✅" />
            <StatCard label="Moves made" value={moves} emoji="👣" />
            <StatCard label="Hints used" value={hints} emoji="✨" />
            <StatCard
              label="Achievements"
              value={achievements}
              emoji="🏅"
            />
          </View>
        ) : (
          <Text style={styles.emptyText}>Start your first trail.</Text>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedText,
    marginTop: 4,
    textAlign: "center",
  },
  preview: {
    backgroundColor: colors.board,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 14,
  },
  friendsRow: {
    fontSize: 34,
  },
  previewPath: {
    fontSize: 18,
    color: colors.pathDark,
    marginTop: 8,
    letterSpacing: 2,
  },
  progressBox: {
    marginTop: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyText: {
    fontSize: 16,
    color: colors.mutedText,
    marginTop: 8,
  },
});
