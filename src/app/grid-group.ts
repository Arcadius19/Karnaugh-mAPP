import {KarnaughMap} from './karnaugh-map';
import {BestGroupsSolver} from './best-groups-solver';
import {ExpressionGroup} from './expression-group';

export class GridGroup {
  offRow: number;
  offCol: number;
  rangeRow: number;
  rangeCol: number;

  constructor(offRow: number, offCol: number, rangeRow: number, rangeCol: number) {
    this.offRow = offRow;
    this.offCol = offCol;
    this.rangeRow = rangeRow;
    this.rangeCol = rangeCol;
  }

  // TODO
  // remove circularity between classes (?)
  // check if cell id's form a valid group
  // static checkIfCellsGrid(cells: number[], nVars = 4) {
  //   return BestGroupsSolver.findBestGroups((new KarnaughMap(nVars)).cellsToMap(cells)).length == 1;
  // }

  toString(): string {
    return `${this.offRow}, ${this.offCol}, ${this.rangeRow}, ${this.rangeCol}`;
  }

  toCells(nVars = 4): number[] {
    if (nVars != 3 && nVars != 4) { return []; }

    let result = [];
    let kmap = new KarnaughMap(nVars);
    for (let i = this.offRow; i < this.offRow + this.rangeRow; i++ ) {
      for (let j = this.offCol; j < this.offCol + this.rangeCol; j++) {
        result.push(kmap.cellIds[i % kmap.cellIds.length][j % kmap.cellIds[0].length]);
      }
    }
    return result;
  }

  toExpressionGroup(nVars = 4): ExpressionGroup {
    if (nVars != 3 && nVars != 4) { return null; }

    let resultGroup: ExpressionGroup;

    let kmap = new KarnaughMap(nVars);
    let firstExpression = kmap.getExpressionAtSquare(this.offRow, this.offCol);
    let nextExpression: ExpressionGroup;

    // check which variables remain the same across all cells
    // if variable changes its value, set to null (does not determine a group)
    for (let i = this.offRow; i < this.offRow + this.rangeRow; i++) {
      for (let j = this.offCol; j < this.offCol + this.rangeCol; j++) {
        nextExpression = kmap.getExpressionAtSquare(i, j);
        resultGroup = firstExpression.compare(nextExpression);
        firstExpression = resultGroup;
      }
    }

    return resultGroup;
  }

}
