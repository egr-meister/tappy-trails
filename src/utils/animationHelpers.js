/**
 * Simple, calm animation configs using React Native's built-in Animated
 * API only. No heavy animation libraries, no flashing, no stressful motion.
 * Each config is safe to use with Animated.timing / Animated.spring.
 */

/**
 * Soft movement animation when the character steps to a new cell.
 */
export function getMoveAnimationConfig() {
  return {
    toValue: 1,
    duration: 180,
    useNativeDriver: true,
  };
}

/**
 * Gentle completion animation for the result celebration.
 */
export function getCompletionAnimationConfig() {
  return {
    toValue: 1,
    friction: 6,
    tension: 60,
    useNativeDriver: true,
  };
}

/**
 * Soft, slow glow loop for the hint path. Calm, never flashing.
 */
export function getHintGlowAnimationConfig() {
  return {
    toValue: 1,
    duration: 900,
    useNativeDriver: true,
  };
}
