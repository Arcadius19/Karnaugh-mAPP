import {GridGroup} from './grid-group';
import {ExpressionGroup} from './expression-group';

export class BestGroupsSolver {
  static marked: number[][];
  static markedCheck: number[][];

  static nRows: number;
  static nColumns: number;

  static dnfType: boolean;

  static bestGroups: GridGroup[];

  // TODO
  // does not work for 3 variables
  public static findBestGroups(markedArray: number[][], dnfType = true): GridGroup[] {
    BestGroupsSolver.marked = markedArray.map(row => row.map(cell => cell));
    BestGroupsSolver.nRows = this.marked.length;
    BestGroupsSolver.nColumns = this.marked[0].length;
    BestGroupsSolver.dnfType = dnfType;
    BestGroupsSolver.bestGroups = [];

    // does not support arrays other that 2x4 (3var kmap) or 4x4 (4var kmap)
    if ((this.nRows != 2 && this.nRows != 4) && (this.nColumns != 4)) {
      return BestGroupsSolver.bestGroups;
    }

    if (BestGroupsSolver.dnfType) {
      BestGroupsSolver.markedCheck = markedArray.map(row => row.map(cell => cell));
    } else {
      this.markedCheck = this.marked.map(x => x.map(y => (1 - y)));
    }

    // Check 16x
    if (BestGroupsSolver.nRows == 4) {
      BestGroupsSolver.checkPushMark(new GridGroup(0, 0, 4, 4));
    }

    // Check 8x
    if (this.nRows == 2) {
      BestGroupsSolver.checkPushMark( new GridGroup(0, 0, 2, 4));
    } else {
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        BestGroupsSolver.checkPushMark( new GridGroup(i, 0, 2, 4));
      }
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkPushMark(new GridGroup(0, j, 4, 2));
      }
    }

    // Check 4x
    for (let i = 0; i < BestGroupsSolver.nRows; i++) {
      BestGroupsSolver.checkPushMark(new GridGroup(i, 0, 1, 4));
    }
    if (this.nRows == 2) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkPushMark(new GridGroup(0, j, 2, 2));
      }
    } else {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkPushMark(new GridGroup(0, j, 4, 1));
      }
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
          BestGroupsSolver.checkPushMark(new GridGroup(i, j, 2, 2));
        }
      }
    }

    // Check 2x
    if (this.nRows == 2) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkPushMark(new GridGroup(0, j, 2, 1));
        for (let i = 0; i < BestGroupsSolver.nRows; i++) {
          BestGroupsSolver.checkPushMark(new GridGroup(i, j, 1, 2));
        }
      }
    } else {
      for (let i = 0; i < BestGroupsSolver.nRows; i++) {
        for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
          BestGroupsSolver.checkPushMark(new GridGroup(i, j, 1, 2));
          BestGroupsSolver.checkPushMark(new GridGroup(i, j, 2, 1));
        }
      }
    }

    // Check 1x
    for (let i = 0; i < BestGroupsSolver.nRows; i++) {
      for (let j = 0; j < BestGroupsSolver.nColumns; j++) {
        BestGroupsSolver.checkPushMark(new GridGroup(i, j, 1, 1));
      }
    }

    let bestGroupExpressions = BestGroupsSolver.bestGroups.map(ExpressionGroup.parseGridGroup);
    bestGroupExpressions = ExpressionGroup.findMinimal(bestGroupExpressions);

    return bestGroupExpressions.map(ExpressionGroup.toGridGroup);
  }

    // to return two values, markedArray and bestArray are passed as an object, so they are modified in place
  private static checkPushMark(gridGroup: GridGroup) {
    if (BestGroupsSolver.checkGroup(gridGroup) && BestGroupsSolver.checkMarked(gridGroup)) {
      BestGroupsSolver.bestGroups.push(gridGroup);
      BestGroupsSolver.markGroup(gridGroup);
    }
  }

  // check if a group of cells starting at [off_row][off_col] spanning to [off_row+ran_row][off_col+ran_col] is a valid group, i.e.
  // all cells in a group evaluate the expression to true
  private static checkGroup(gridGroup: GridGroup): boolean {
    let comparison = BestGroupsSolver.dnfType ? 0 : 1;
    let isValid = true;
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        if (BestGroupsSolver.marked[i % this.nRows][j % this.nColumns] == comparison) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  // check if in the following group, there is at least one cell which has not been marked yet
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

  private static markGroup(gridGroup: GridGroup): void {
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        BestGroupsSolver.markedCheck[i % BestGroupsSolver.nRows][j % BestGroupsSolver.nColumns] = 0;
      }
    }
  }

}
