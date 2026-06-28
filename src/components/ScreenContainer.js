import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "../theme/colors";

/**
 * A safe-area aware page wrapper used by every screen. It applies the
 * device insets so content never overlaps camera cutouts, notches, or
 * rounded corners, and keeps a calm garden background.
 *
 * Props:
 *   - scroll: render content inside a ScrollView (default true)
 *   - center: center children vertically (only when scroll is false)
 */
export default function ScreenContainer({ children, scroll = true, center = false }) {
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: (insets?.top ?? 0) + 14,
    paddingBottom: (insets?.bottom ?? 0) + 14,
    paddingLeft: (insets?.left ?? 0) + 16,
    paddingRight: (insets?.right ?? 0) + 16,
  };

  if (scroll) {
    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, padding]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.flex,
          padding,
          center && styles.centered,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centered: {
    justifyContent: "center",
  },
});
