import {GridGroup} from './grid-group';
import {ExpressionGroup} from './expression-group';
import {KarnaughMap} from './karnaugh-map';

export class BestGroupsSolver {
  static marked: number[][];
  static markedCheck: number[][];

  static nRows: number;
  static nColumns: number;

  static dnfType: boolean;

  static bestGroups;

  public static findBestGroups(markedArray: number[][], dnfType = true): ExpressionGroup[][] {
    BestGroupsSolver.marked = markedArray.map(row => row.map(cell => cell));
    BestGroupsSolver.nRows = this.marked.length;
    BestGroupsSolver.nColumns = this.marked[0].length;
    BestGroupsSolver.dnfType = dnfType;
    BestGroupsSolver.bestGroups = [];

    // does not support arrays other that 2x4 (3var kmap) or 4x4 (4var kmap)
    if ((this.nRows != 2 && this.nRows != 4) && (this.nColumns != 4)) {
      throw new Error ('Unsupported dimensions. Array should be 2x4 or 4x4');
    }

    if (BestGroupsSolver.dnfType) {
      BestGroupsSolver.markedCheck = markedArray.map(row => row.map(cell => cell));
    } else {
      this.markedCheck = this.marked.map(x => x.map(y => (1 - y)));
    }

    // Check 16x
    if (BestGroupsSolver.nRows == 4) {
      BestGroupsSolver.checkAndPush(new GridGroup(0, 0, 4, 4));
    }
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));

    // Check 8x
    if (this.nRows == 2) {
      BestGroupsSolver.checkAndPush( new GridGroup(0, 0, 2, 4));
    } else {
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        BestGroupsSolver.checkAndPush( new GridGroup(i, 0, 2, 4));
      }
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkAndPush(new GridGroup(0, j, 4, 2));
      }
    }
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));

    // Check 4x
    for (let i = 0; i < BestGroupsSolver.nRows; i++) {
      BestGroupsSolver.checkAndPush(new GridGroup(i, 0, 1, 4));
    }
    if (this.nRows == 2) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkAndPush(new GridGroup(0, j, 2, 2));
      }
    } else {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkAndPush(new GridGroup(0, j, 4, 1));
      }
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
          BestGroupsSolver.checkAndPush(new GridGroup(i, j, 2, 2));
        }
      }
    }
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));

    // Check 2x
    if (this.nRows == 2) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkAndPush(new GridGroup(0, j, 2, 1));
        for (let i = 0; i < BestGroupsSolver.nRows; i++) {
          BestGroupsSolver.checkAndPush(new GridGroup(i, j, 1, 2));
        }
      }
    } else {
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
          BestGroupsSolver.checkAndPush(new GridGroup(i, j, 1, 2));
          BestGroupsSolver.checkAndPush(new GridGroup(i, j, 2, 1));
        }
      }
    }
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));

    // Check 1x
    for (let i = 0; i < BestGroupsSolver.nRows; i++) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkAndPush(new GridGroup(i, j, 1, 1));
      }
    }
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));

    let bestGroupMaps = BestGroupsSolver.bestGroups.map(group => group.toMap((this.nRows == 4) ? 4 : 3));
    let bestGroupsOfGroups = BestGroupsSolver.findMinimal(bestGroupMaps);

    let kmap = new KarnaughMap((this.nRows == 4) ? 4 : 3);

    let bestGroupsOfGroupsExpressions = bestGroupsOfGroups.map(groupOfGroups => groupOfGroups.map(group => kmap.mapToExpression(group)));

    return bestGroupsOfGroupsExpressions;
  }

  private static checkAndPush(gridGroup: GridGroup) {
    if (BestGroupsSolver.checkGroup(gridGroup) && BestGroupsSolver.checkMarked(gridGroup)) {
      BestGroupsSolver.bestGroups.push(gridGroup);
    }
  }

  // check if a group of cells starting at [off_row][off_col] spanning to [off_row+ran_row][off_col+ran_col] is a valid group, i.e.
  // all cells in a group evaluate the expression to true
  private static checkGroup(gridGroup: GridGroup): boolean {
    let comparison = BestGroupsSolver.dnfType ? 0 : 1;
    let isValid = true;
    outerLoop:
      for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
        for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
          if (BestGroupsSolver.marked[i % this.nRows][j % this.nColumns] == comparison) {
            isValid = false;
            break outerLoop;
          }
        }
      }
    return isValid;
  }

  // check if in the following group there is at least one cell which has not been marked yet
  private static checkMarked(gridGroup: GridGroup): boolean {
    let hasUngrouped = false;
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        if (BestGroupsSolver.markedCheck[i % BestGroupsSolver.nRows][j % BestGroupsSolver.nColumns] == 1) {
          hasUngrouped = true;
          break;
        }
      }
    }
    return hasUngrouped;
  }

  private static findAuxMinimalAndMark() {
    let bestGroupExpressions = BestGroupsSolver.bestGroups.map(group => group.toExpressionGroup((this.nRows == 4) ? 4 : 3));
    // TODO: support multiple solutions instead f taking the first one
    bestGroupExpressions = ExpressionGroup.findMinimal(bestGroupExpressions)[0];
    BestGroupsSolver.bestGroups = bestGroupExpressions.map(group => group.toGridGroup((this.nRows == 4) ? 4 : 3));
    BestGroupsSolver.bestGroups.forEach(group => BestGroupsSolver.markGroup(group));
  }


  private static markGroup(gridGroup: GridGroup): void {
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        BestGroupsSolver.markedCheck[i % BestGroupsSolver.nRows][j % BestGroupsSolver.nColumns] = 0;
      }
    }
  }

  private static findMinimal(groups: number[][][]) {
    let result = [];
    let found = false;
    for (let a = 0; a < groups.length; a++) {
      if (BestGroupsSolver.coverAll(BestGroupsSolver.sumGroups(groups[a]))) {
        result.push([groups[a]]);
        found = true;
      }
    }
    if (found) { return result; }

    for (let a = 0; a < groups.length; a++) {
      for (let b = a + 1; b < groups.length; b++) {
        if (BestGroupsSolver.coverAll(BestGroupsSolver.sumGroups(groups[a], groups[b]))) {
          result.push([groups[a], groups[b]]);
          found = true;
        }
      }
    }
    if (found) { return result; }

    for (let a = 0; a < groups.length; a++) {
      for (let b = a + 1; b < groups.length; b++) {
        for (let c = b + 1; c < groups.length; c++) {
          if (BestGroupsSolver.coverAll(BestGroupsSolver.sumGroups(groups[a], groups[b], groups[c]))) {
            result.push([groups[a], groups[b], groups[c]]);
            found = true;
          }
        }
      }
    }
    if (found) { return result; }

    for (let a = 0; a < groups.length; a++) {
      for (let b = a + 1; b < groups.length; b++) {
        for (let c = b + 1; c < groups.length; c++) {
          for (let d = c + 1; d < groups.length; d++) {
            if (BestGroupsSolver.coverAll(BestGroupsSolver.sumGroups(groups[a], groups[b], groups[c], groups[d]))) {
              result.push([groups[a], groups[b], groups[c], groups[d]]);
              found = true;
            }
          }
        }
      }
    }
    if (found) { return result; }

    for (let a = 0; a < groups.length; a++) {
      for (let b = a + 1; b < groups.length; b++) {
        for (let c = b + 1; c < groups.length; c++) {
          for (let d = c + 1; d < groups.length; d++) {
            for (let e = d + 1; e < groups.length; e++) {
              if (BestGroupsSolver.coverAll(BestGroupsSolver.sumGroups(groups[a], groups[b], groups[c], groups[d], groups[e]))) {
                result.push([groups[a], groups[b], groups[c], groups[d], groups[e]]);
                found = true;
              }
            }
          }
        }
      }
    }
    if (found) { return result; }

    return result;

  }

  public static sumGroups(...groups: number[][][]) {
    let result = groups[0].map(row => row.map(cell => 0));

    for (let i = 0; i < groups.length; i++) {
      for (let row = 0; row < groups[i].length; row++) {
        for (let col = 0; col < groups[i][row].length; col++) {
          if (groups[i][row][col] == 1) {
            result[row][col] = 1;
          }
        }
      }
    }
    return result;
  }

  private static coverAll(group: number[][]): boolean {
    if (BestGroupsSolver.dnfType) {
      return BestGroupsSolver.marked.every((row, i) => row.every((cell, j) => cell == group[i][j]));
    } else {
      return BestGroupsSolver.marked.every((row, i) => row.every((cell, j) => cell != group[i][j]));
    }
  }

}
