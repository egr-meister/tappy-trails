import * as KeepAwake from "expo-keep-awake";

/**
 * Immersive + keep-awake helpers.
 *
 * Fullscreen sticky immersive behaviour (hiding the status and navigation
 * bars) is handled declaratively by the <SystemBars hidden /> component
 * from react-native-edge-to-edge in App.js, which is the recommended,
 * non-deprecated approach for Expo edge-to-edge apps.
 *
 * Keep-awake is only ever activated on the active maze screen and is always
 * released when leaving it. Every call is wrapped so a missing native API
 * can never crash the app.
 */

const KEEP_AWAKE_TAG = "tappy-trails-maze";

/**
 * Safe placeholder for enabling sticky immersive mode. The actual hiding of
 * system bars is declarative (SystemBars). This exists so screens can call
 * it without needing to know the implementation, and it never throws.
 */
export function enableStickyImmersiveMode() {
  try {
    // SystemBars (react-native-edge-to-edge) already keeps the bars hidden.
    // Nothing imperative is required here; return true to signal success.
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Activate keep-awake for the maze screen only.
 */
export function activateGameKeepAwake() {
  try {
    KeepAwake.activateKeepAwakeAsync(KEEP_AWAKE_TAG);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Deactivate the maze-screen keep-awake. Safe to call multiple times.
 */
export function deactivateGameKeepAwake() {
  try {
    KeepAwake.deactivateKeepAwake(KEEP_AWAKE_TAG);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Generic safe release, used by cleanup paths.
 */
export function disableKeepAwakeSafely() {
  return deactivateGameKeepAwake();
}
