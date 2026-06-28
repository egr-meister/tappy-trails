import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SystemBars } from "react-native-edge-to-edge";
import AppNavigator from "./src/navigation/AppNavigator";

/**
 * Tappy Trails
 * A calm, offline, child-friendly tap-based trail maze game.
 *
 * App.js wires up the safe-area provider, hides the system bars for a
 * fullscreen sticky immersive feel, and renders the stack navigator.
 * There is no internet access, no analytics, and no runtime permissions.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      {/* Hide status + navigation bars; they reappear briefly on edge swipe. */}
      <SystemBars hidden={true} style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
