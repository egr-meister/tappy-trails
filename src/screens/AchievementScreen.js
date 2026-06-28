import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import AchievementBadge from "../components/AchievementBadge";
import colors from "../theme/colors";
import {
  ACHIEVEMENT_ITEMS,
  getUnlockedAchievements,
} from "../data/achievementItems";
import { loadAppData } from "../storage/appStorage";

/**
 * Local achievement badges. No rankings, no leaderboards, no social sharing.
 * Badges are simple progress markers and have no money value.
 */
export default function AchievementScreen({ navigation }) {
  const [unlockedIds, setUnlockedIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadAppData().then((loaded) => {
        if (active) {
          setUnlockedIds(getUnlockedAchievements(loaded?.stats));
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const unlockedCount = unlockedIds.length;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>
        Unlocked {unlockedCount} of {ACHIEVEMENT_ITEMS.length} badges.
      </Text>

      {ACHIEVEMENT_ITEMS.map((item) => (
        <AchievementBadge
          key={item.id}
          achievement={item}
          unlocked={unlockedIds.includes(item.id)}
        />
      ))}

      <Text style={styles.note}>
        Achievements are simple progress markers inside the app. They have no
        money value.
      </Text>

      <View style={styles.buttons}>
        <AppButton
          title="My Progress"
          emoji="📊"
          variant="primary"
          onPress={() => navigation.navigate("TrailProgress")}
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
  },
  subtitle: {
    fontSize: 15,
    color: colors.mutedText,
    marginBottom: 10,
  },
  note: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  buttons: {
    marginTop: 14,
  },
});
