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

  toString(): string {
    let resultString = 'A: ' + this.aVar + ', B: ' + this.bVar + ', C: ' + this.cVar + ', D: ' + this.dVar;
    return resultString;
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

}
ExpressionGroup.initilize();
