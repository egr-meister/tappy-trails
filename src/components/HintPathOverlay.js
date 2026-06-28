import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

import colors from "../theme/colors";
import { getHintGlowAnimationConfig } from "../utils/animationHelpers";

/**
 * A gentle, glowing hint banner shown above the maze. It softly pulses
 * (never flashes) and displays a friendly message. The glowing cells
 * themselves are rendered by MazeCell via its `isHint` flag.
 */
export default function HintPathOverlay({ visible = false, message = "" }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop;
    if (visible) {
      const config = getHintGlowAnimationConfig();
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { ...config, toValue: 1 }),
          Animated.timing(pulse, { ...config, toValue: 0 }),
        ])
      );
      loop.start();
    } else {
      pulse.setValue(0);
    }
    return () => {
      if (loop) loop.stop();
    };
  }, [visible, pulse]);

  if (!visible) return null;

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <Animated.View style={[styles.banner, { opacity }]}>
      <Text style={styles.text}>✨ {message || "Follow the glowing path."}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.hintGlow,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignSelf: "stretch",
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
