import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../theme/colors";

import TappyHomeScreen from "../screens/TappyHomeScreen";
import CharacterPickerScreen from "../screens/CharacterPickerScreen";
import LevelPickerScreen from "../screens/LevelPickerScreen";
import TrailMazeScreen from "../screens/TrailMazeScreen";
import MazeResultScreen from "../screens/MazeResultScreen";
import TrailProgressScreen from "../screens/TrailProgressScreen";
import AchievementScreen from "../screens/AchievementScreen";
import ParentSettingsScreen from "../screens/ParentSettingsScreen";

const Stack = createNativeStackNavigator();

/**
 * Navigation theme MUST extend DefaultTheme so that required theme fields
 * (including fonts) are always present in release builds.
 */
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

/**
 * Simple stack navigation. Headers are hidden so the app stays fullscreen
 * and child-friendly; each screen draws its own back button.
 */
export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="TappyHome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        <Stack.Screen name="TappyHome" component={TappyHomeScreen} />
        <Stack.Screen name="CharacterPicker" component={CharacterPickerScreen} />
        <Stack.Screen name="LevelPicker" component={LevelPickerScreen} />
        <Stack.Screen name="TrailMaze" component={TrailMazeScreen} />
        <Stack.Screen name="MazeResult" component={MazeResultScreen} />
        <Stack.Screen name="TrailProgress" component={TrailProgressScreen} />
        <Stack.Screen name="Achievement" component={AchievementScreen} />
        <Stack.Screen name="ParentSettings" component={ParentSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
