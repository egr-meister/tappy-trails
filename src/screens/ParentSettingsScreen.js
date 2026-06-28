import React, { useState, useCallback } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenContainer from "../components/ScreenContainer";
import AppButton from "../components/AppButton";
import colors from "../theme/colors";
import {
  loadAppData,
  updateSettings,
  clearAllData,
} from "../storage/appStorage";

/**
 * Parent settings. All options are local and offline. Includes clear privacy
 * and child-safety notes, and a Clear All Data action.
 */
export default function ParentSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState(null);

  const reload = useCallback(() => {
    let active = true;
    loadAppData().then((loaded) => {
      if (active) setSettings(loaded?.settings ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  useFocusEffect(reload);

  const apply = async (partial) => {
    const next = await updateSettings(partial);
    setSettings(next?.settings ?? null);
  };

  const onClearAll = () => {
    Alert.alert(
      "Clear all data",
      "Are you sure you want to delete all local trail progress?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const next = await clearAllData();
            setSettings(next?.settings ?? null);
            Alert.alert("All data cleared", "Default settings restored.");
          },
        },
      ]
    );
  };

  const soundEnabled = settings?.soundEnabled ?? true;
  const difficulty = settings?.defaultDifficulty ?? "easy";
  const hintsEnabled = settings?.pathHintsEnabled ?? true;
  const animationEnabled = settings?.moveAnimationEnabled ?? true;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Parent Settings</Text>

      <SettingBlock
        title="Sound"
        note="Gentle movement and success sounds can be turned off anytime."
      >
        <Segmented
          options={[
            { value: true, label: "On" },
            { value: false, label: "Off" },
          ]}
          selected={soundEnabled}
          onSelect={(v) => apply({ soundEnabled: v })}
        />
      </SettingBlock>

      <SettingBlock
        title="Default Difficulty"
        note="The trail picker opens with this difficulty in mind."
      >
        <Segmented
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          selected={difficulty}
          onSelect={(v) => apply({ defaultDifficulty: v })}
        />
      </SettingBlock>

      <SettingBlock
        title="Path Hints"
        note="Hints softly show the next path step."
      >
        <Segmented
          options={[
            { value: true, label: "On" },
            { value: false, label: "Off" },
          ]}
          selected={hintsEnabled}
          onSelect={(v) => apply({ pathHintsEnabled: v })}
        />
      </SettingBlock>

      <SettingBlock
        title="Move Animation"
        note="Movement animation is soft and can be turned off."
      >
        <Segmented
          options={[
            { value: true, label: "On" },
            { value: false, label: "Off" },
          ]}
          selected={animationEnabled}
          onSelect={(v) => apply({ moveAnimationEnabled: v })}
        />
      </SettingBlock>

      <SettingBlock
        title="Theme"
        note="Tappy Trails uses a bright but calm trail garden theme."
      >
        <View style={styles.themeChip}>
          <Text style={styles.themeChipText}>🌿 Tappy Trail Garden</Text>
        </View>
      </SettingBlock>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Achievement Progress</Text>
        <Text style={styles.infoText}>
          Achievements are simple progress markers inside the app. They have no
          money value.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Privacy</Text>
        <Text style={styles.infoText}>
          Tappy Trails does not collect personal data. The app works offline and
          stores maze progress, statistics, achievements, and settings only on
          this device.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Child-Friendly</Text>
        <Text style={styles.infoText}>
          There are no ads, purchases, accounts, internet access, social
          sharing, leaderboards, coins, bonuses, jackpots, or real money
          rewards.
        </Text>
      </View>

      <View style={styles.buttons}>
        <AppButton
          title="Clear All Data"
          emoji="🧹"
          variant="danger"
          onPress={onClearAll}
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

function SettingBlock({ title, note, children }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {children}
      {note ? <Text style={styles.blockNote}>{note}</Text> : null}
    </View>
  );
}

function Segmented({ options, selected, onSelect }) {
  return (
    <View style={styles.segmented}>
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <Pressable
            key={String(opt.value)}
            onPress={() => onSelect(opt.value)}
            style={[styles.segment, isSelected && styles.segmentSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.segmentLabel,
                isSelected && styles.segmentLabelSelected,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 8,
  },
  block: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 14,
    marginVertical: 7,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  blockNote: {
    fontSize: 13,
    color: colors.mutedText,
    marginTop: 8,
  },
  segmented: {
    flexDirection: "row",
    backgroundColor: colors.board,
    borderRadius: 14,
    padding: 4,
  },
  segment: {
    flex: 1,
    minHeight: 46,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  segmentLabelSelected: {
    color: "#FFFFFF",
  },
  themeChip: {
    backgroundColor: colors.board,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  themeChipText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  infoCard: {
    backgroundColor: "#F2F8EE",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 14,
    marginVertical: 7,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  buttons: {
    marginTop: 14,
  },
});
