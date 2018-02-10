import { KmapComponent } from './kmap/kmap.component';

export class ExpressionGroup {
  static FLAG_A = 8; // 1000
  static FLAG_B = 4; // 0100
  static FLAG_C = 2; // 0010
  static FLAG_D = 1; // 0001
  static kmapIDs: number[][];

  aVar: boolean;
  bVar: boolean;
  cVar: boolean;
  dVar: boolean;

  static initilize() {
    ExpressionGroup.kmapIDs = [[], [], [], []];
    const binaries = ['00', '01', '11', '10'];
    for (let i in binaries) {
      for (let j in binaries) {
        ExpressionGroup.kmapIDs[i][j] = parseInt(binaries[i] + binaries[j], 2);
      }
    }
  }

  constructor(aVar: boolean, bVar: boolean, cVar: boolean, dVar: boolean) {
    this.aVar = aVar;
    this.bVar = bVar;
    this.cVar = cVar;
    this.dVar = dVar;
  }

  static findVarValue(offRow: number, offCol: number, variable: string) {
    let flag: number;
    switch (variable) {
      case 'A': {flag = ExpressionGroup.FLAG_A; break; }
      case 'B': {flag = ExpressionGroup.FLAG_B; break; }
      case 'C': {flag = ExpressionGroup.FLAG_C; break; }
      case 'D': {flag = ExpressionGroup.FLAG_D; break; }
    }

    return !!(ExpressionGroup.kmapIDs[offRow % 4][offCol % 4] & flag);
  }

  static fromGridToGroup(offRow: number, offCol: number, rangeRow: number, rangeCol: number): ExpressionGroup {
    let resultGroup: ExpressionGroup;

    let varValues = [];
    let varChanges = [false, false, false, false];
    let varChars = ['A', 'B', 'C', 'D'];

    // check variables' value in most upper-left cells
    for (let i in varChars) {
      varValues[i] = ExpressionGroup.findVarValue(offRow, offCol, varChars[i]);
    }

    // check which variables remain the same across all cells
    // if variable changes its value, set to null (does not determine a group)
    for (let i = offRow; i < offRow + rangeRow; i++) {
      for (let j = offCol; j < offCol + rangeCol; j++) {
        for (let k in varValues) {
          if (!varChanges[k] && (varValues[k] != ExpressionGroup.findVarValue(i, j, varChars[k]))) {
            varChanges[k] = true;
            varValues[k] = null;
          }
        }
      }
    }

    resultGroup = new ExpressionGroup(varValues[0], varValues[1], varValues[2], varValues[3]);

    return resultGroup;
  }

  static findNumberArray(variable: boolean, flag: number): number[] {
    if (variable == null) {
      return [0, flag];
    } else if (variable == true) {
      return [flag];
    } else {
      return [0];
    }
  }

  toString(): string {
    return ('A: ' + this.aVar + ', B: ' + this.bVar + ', C: ' + this.cVar + ', D: ' + this.dVar);
  }

  containedIn(expression: ExpressionGroup): boolean {
    if (expression.aVar != null && this.aVar != expression.aVar) { return false; }
    if (expression.bVar != null && this.bVar != expression.bVar) { return false; }
    if (expression.cVar != null && this.cVar != expression.cVar) { return false; }
    if (expression.dVar != null && this.dVar != expression.dVar) { return false; }

    return true;
  }

  resolutionAux(var1: boolean, var2: boolean): boolean {
    let result: boolean = null;

    if (var1 == var2) { result = var1; }
    if (var1 == null) { result = var2; }
    if (var2 == null) { result = var1; }

    return result;
  }

  resolute(expression: ExpressionGroup): ExpressionGroup {
    let result = new ExpressionGroup(null, null, null, null);

    result.aVar = this.resolutionAux(this.aVar, expression.aVar);
    result.bVar = this.resolutionAux(this.bVar, expression.bVar);
    result.cVar = this.resolutionAux(this.cVar, expression.cVar);
    result.dVar = this.resolutionAux(this.dVar, expression.dVar);

    return result;
  }

  equals(expression: ExpressionGroup): boolean {
    if (this.aVar != expression.aVar) { return false; }
    if (this.bVar != expression.bVar) { return false; }
    if (this.cVar != expression.cVar) { return false; }
    if (this.dVar != expression.dVar) { return false; }

    return true;
  }

  fromGroupToGrid(): number[] {
    let nRow = 4;
    let nCol = 4;

    let endRow = nRow;
    let endCol = nCol;

    let i = 0;
    let j = 0;

    let candidate: number[];

    loop:
      for (let rowAdd = 0; rowAdd < nRow; rowAdd++) {
        for (let colAdd = 0; colAdd < nCol; colAdd++) {
          candidate = this.findCandidateGrid(i + rowAdd, j + colAdd, nRow, nCol, endRow + rowAdd, endCol + colAdd);

          console.log('rowAdd: ', rowAdd, ' colAdd: ', colAdd);
          console.log('candidate: ', candidate);
          console.log(ExpressionGroup.fromGridToGroup(candidate[0], candidate[1], candidate[2], candidate[3]));

          if (this.equals(ExpressionGroup.fromGridToGroup(candidate[0], candidate[1], candidate[2], candidate[3]))) {
            break loop;
          }
        }
      }

    return candidate;

  }

  findCandidateGrid(i: number, j: number, nRow: number, nCol: number, rowEnd: number, colEnd: number): number[] {
    let cells = this.findCells();

    let offRow = -1;
    let offCol = -1;
    let rangeRow = 0;
    let rangeCol = 0;

    let goRow = true;
    let goCol = true;

    let startColScan = j;

    findGrid:
      while (i < rowEnd) {
        goRow = true;
        j = startColScan;
        while (j < colEnd) {
          if (cells.includes(ExpressionGroup.kmapIDs[i % nRow][j % nCol])) {
            if (offRow < 0 && offCol < 0) {
              offRow = i % nRow;
              offCol = j % nCol;
              startColScan = j;
            }
            if (goRow) {
              rangeRow++;
              goRow = false;
            }
            if (goCol) { rangeCol++; }
            if (j == colEnd - 1) { goCol = false; }
          } else if (offCol >= 0) {
            goCol = false;
            if (j != startColScan) {
              break findGrid;
            } else {
              i++;
              continue findGrid;
            }
          }
          j++;
        }
        i++;
      }

    return [offRow, offCol, rangeRow, rangeCol];
  }

  findCells(): number[] {
    let aNumber = ExpressionGroup.findNumberArray(this.aVar, ExpressionGroup.FLAG_A);
    let bNumber = ExpressionGroup.findNumberArray(this.bVar, ExpressionGroup.FLAG_B);
    let cNumber = ExpressionGroup.findNumberArray(this.cVar, ExpressionGroup.FLAG_C);
    let dNumber = ExpressionGroup.findNumberArray(this.dVar, ExpressionGroup.FLAG_D);

    let result: number[] = [];
    for (let a of aNumber) {
      for (let b of bNumber) {
        for (let c of cNumber) {
          for (let d of dNumber) {
            result.push(a + b + c + d);
          }
        }
      }
    }
    return result;
  }

}
ExpressionGroup.initilize();
