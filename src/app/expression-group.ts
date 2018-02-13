import {GridGroup} from './grid-group';
import {MathJax} from './mathjax-aux/math-jax';

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

  // check the value of a given variable in the cell [offRow, offCol]
  static findVarValue(offRow: number, offCol: number, flag: number) {
    return !!(ExpressionGroup.kmapIDs[offRow % 4][offCol % 4] & flag);
  }

  // convert GridGroup to ExpressionGroup (from coordinates to boolean values)
  static parseGridGroup(gridGroup: GridGroup): ExpressionGroup {
    let resultGroup: ExpressionGroup;

    let varValues = [];
    let varChanges = [false, false, false, false];
    let varFlags = [ExpressionGroup.FLAG_A, ExpressionGroup.FLAG_B, ExpressionGroup.FLAG_C, ExpressionGroup.FLAG_D];

    // check variables' value in most upper-left cells
    for (let i in varFlags) {
      varValues[i] = ExpressionGroup.findVarValue(gridGroup.offRow, gridGroup.offCol, varFlags[i]);
    }

    // check which variables remain the same across all cells
    // if variable changes its value, set to null (does not determine a group)
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        for (let k in varValues) {
          if (!varChanges[k] && (varValues[k] != ExpressionGroup.findVarValue(i, j, varFlags[k]))) {
            varChanges[k] = true;
            varValues[k] = null;
          }
        }
      }
    }

    return new ExpressionGroup(varValues[0], varValues[1], varValues[2], varValues[3]);
  }

  static toGridGroup(expressionGroup: ExpressionGroup): GridGroup {
    return expressionGroup.toGridGroup();
  }

  // unitary array of numbers for one variable used later for calculating a total number for which an expression evaluates to true
  static findNumberArray(variable: boolean, flag: number): number[] {
    if (variable == null) {
      return [0, flag];
    } else if (variable == true) {
      return [flag];
    } else {
      return [0];
    }
  }

  static findMinimal(expressions: ExpressionGroup[]): ExpressionGroup[] {
    let index = 0;
    indexLoop:
      while (index < expressions.length) {
        for (let i = 0; i < expressions.length; i++) {
          for (let j = i + 1; j < expressions.length; j++) {
            if (index != i && index != j) {
              if (expressions[index].equals(expressions[i].resolute(expressions[j]))) {
                expressions.splice(index, 1);
                continue indexLoop;
              }
            }
          }
        }
        index++;
      }

    return expressions;
  }

  static resolutionAux(var1: boolean, var2: boolean): boolean {
    let result: boolean = null;

    if (var1 == var2) { result = var1; }
    if (var1 == null) { result = var2; }
    if (var2 == null) { result = var1; }

    return result;
  }

  static toMathJaxAux(variable: boolean, char: string, connector: string, notNegate = true): string {
    let resultString = '';
    if (variable == notNegate) {
      resultString = char + connector;
    } else if (variable == !notNegate) {
      resultString = ' not ' + char + connector;
    }

    return resultString;
  }

  static toWholeSolution(groups: ExpressionGroup[], dnfType = true): string {
    let connector = dnfType ? ' or ' : ' and ';
    let result = groups[0].toMathJax(dnfType);

    for (let i = 1; i < groups.length; i++) {
      result = '(' + result + ')' + connector + '(' + groups[i].toMathJax() + ')';
    }

    return MathJax.toMathJax(result);
  }

  toString(): string {
    return ('A: ' + this.aVar + ', B: ' + this.bVar + ', C: ' + this.cVar + ', D: ' + this.dVar);
  }

  toMathJax(product = true): string {
    let connector = product ? ' and ' : ' or ';
    let resultString = ExpressionGroup.toMathJaxAux(this.aVar, 'A', connector, product) +
      ExpressionGroup.toMathJaxAux(this.bVar, 'B', connector, product) +
      ExpressionGroup.toMathJaxAux(this.cVar, 'C', connector, product) +
      ExpressionGroup.toMathJaxAux(this.dVar, 'D', connector, product);

    // remove and at the end if exists
    if (resultString.substr(-connector.length, connector.length) == connector) {
      resultString = resultString.slice(0, -connector.length);
    }

    return resultString;
  }

  equals(expression: ExpressionGroup): boolean {
    if (this.aVar != expression.aVar) { return false; }
    if (this.bVar != expression.bVar) { return false; }
    if (this.cVar != expression.cVar) { return false; }
    if (this.dVar != expression.dVar) { return false; }

    return true;
  }

  // find for which cells (their IDs) the expression evaluates to true
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

  resolute(expression: ExpressionGroup): ExpressionGroup {
    let result = new ExpressionGroup(null, null, null, null);

    result.aVar = ExpressionGroup.resolutionAux(this.aVar, expression.aVar);
    result.bVar = ExpressionGroup.resolutionAux(this.bVar, expression.bVar);
    result.cVar = ExpressionGroup.resolutionAux(this.cVar, expression.cVar);
    result.dVar = ExpressionGroup.resolutionAux(this.dVar, expression.dVar);

    return result;
  }

  containedIn(expression: ExpressionGroup): boolean {
    if (expression.aVar != null && this.aVar != expression.aVar) { return false; }
    if (expression.bVar != null && this.bVar != expression.bVar) { return false; }
    if (expression.cVar != null && this.cVar != expression.cVar) { return false; }
    if (expression.dVar != null && this.dVar != expression.dVar) { return false; }

    return true;
  }

  toGridGroup(): GridGroup {
    let nRow = 4;
    let nCol = 4;

    let endRow = nRow;
    let endCol = nCol;

    let i = 0;
    let j = 0;

    let candidate: GridGroup;

    loop:
      for (let rowAdd = 0; rowAdd < nRow; rowAdd++) {
        for (let colAdd = 0; colAdd < nCol; colAdd++) {
          candidate = this.findCandidateGrid(i + rowAdd, j + colAdd, nRow, nCol, endRow + rowAdd, endCol + colAdd);

          if (this.equals(ExpressionGroup.parseGridGroup(candidate))) {
            break loop;
          }
        }
      }

    return candidate;

  }

  findCandidateGrid(i: number, j: number, nRow: number, nCol: number, rowEnd: number, colEnd: number): GridGroup {
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

    return new GridGroup(offRow, offCol, rangeRow, rangeCol);
  }

}
ExpressionGroup.initilize();
