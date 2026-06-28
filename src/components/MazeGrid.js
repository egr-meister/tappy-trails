import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import colors from "../theme/colors";
import MazeCell from "./MazeCell";
import CharacterToken from "./CharacterToken";
import GoalToken from "./GoalToken";
import {
  getCellKey,
  getGridSize,
  isSameCell,
} from "../utils/mazeHelpers";

/**
 * Renders the maze board as a soft garden path map.
 *
 * Props:
 *   - level: the maze level object
 *   - currentPosition: { row, col } of the character
 *   - hintCells: array of { row, col } to softly glow
 *   - characterId: which friend token to show
 *   - onCellPress: (row, col) => void
 */
export default function MazeGrid({
  level,
  currentPosition,
  hintCells = [],
  characterId = "bunny",
  onCellPress,
}) {
  const grid = level?.grid ?? [];
  const size = getGridSize(level);

  // Fit the board comfortably within a portrait screen.
  const screenWidth = Dimensions.get("window").width;
  const maxBoard = Math.min(screenWidth - 48, 360);
  const cellSize = Math.floor(maxBoard / Math.max(size, 1));
  const tokenSize = Math.floor(cellSize * 0.62);

  if (!Array.isArray(grid) || grid.length === 0) {
    // Safe fallback: nothing to render.
    return <View style={styles.empty} />;
  }

  const isHintCell = (row, col) =>
    hintCells.some((c) => c && c.row === row && c.col === col);

  const goal = level?.goal ?? null;

  return (
    <View style={styles.board}>
      {grid.map((gridRow, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {(gridRow ?? []).map((cellType, colIndex) => {
            const here = { row: rowIndex, col: colIndex };
            const hasCharacter = isSameCell(currentPosition, here);
            const isGoalHere = goal && isSameCell(goal, here);

            return (
              <MazeCell
                key={getCellKey(rowIndex, colIndex)}
                cellType={cellType}
                size={cellSize}
                isHint={isHintCell(rowIndex, colIndex) && !hasCharacter}
                onPress={() => onCellPress && onCellPress(rowIndex, colIndex)}
              >
                {hasCharacter ? (
                  <CharacterToken characterId={characterId} size={tokenSize} />
                ) : isGoalHere ? (
                  <GoalToken goalId={level?.goalId} size={tokenSize} />
                ) : null}
              </MazeCell>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: colors.board,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: colors.border,
    padding: 8,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
  },
  empty: {
    height: 120,
  },
});
