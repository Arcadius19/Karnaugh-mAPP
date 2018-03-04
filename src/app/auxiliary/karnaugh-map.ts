import {CustomParser} from './custom-parser';
import {ExpressionGroup} from './expression-group';

export class KarnaughMap {
  nVars: number;
  cellIds: number[][];
  binariesVertical: string[];

  flagA: number;
  flagB: number;
  flagC: number;
  flagD: number;

  constructor(nVars = 4) {
    if (!(nVars == 3 || nVars == 4)) {
      throw new Error('Invalid number of arguments. The number should be 3 or 4.');
    }

    let binariesVertical: string[];
    let binariesHorizontal: string[];

    if (nVars == 3) {
      this.cellIds = [[], []];
      this.flagA = 4;
      this.flagB = 2;
      this.flagC = 1;
      binariesVertical = ['0', '1'];
      binariesHorizontal = ['00', '01', '11', '10'];
    }

    if (nVars == 4) {
      this.cellIds = [[], [], [], []];
      this.flagA = 8;
      this.flagB = 4;
      this.flagC = 2;
      this.flagD = 1;
      binariesVertical = ['00', '01', '11', '10'];
      binariesHorizontal = ['00', '01', '11', '10'];
    }

    this.binariesVertical = binariesVertical;
    this.nVars = nVars;
    for (let i in binariesVertical) {
      for (let j in binariesHorizontal) {
        this.cellIds[i][j] = parseInt(binariesVertical[i] + binariesHorizontal[j], 2);
      }
    }
  }

  public evaluate(query: string): number[][] {
    let aVar: Boolean;
    let bVar: Boolean;
    let cVar: Boolean;
    let dVar: Boolean;
    let evaluation: Boolean;

    let evaluations = this.cellIds.slice(0).map(row => row.map(cell => 0));

    const parser = CustomParser.PARSER;
    let expression;
    try {
      query = CustomParser.preParse(query);
      expression = parser.parse(query);
      for (let i in this.cellIds) {
        for (let j in this.cellIds[i]) {
          let decimalNumber = this.cellIds[i][j];
          aVar = !!(decimalNumber & this.flagA);
          bVar = !!(decimalNumber & this.flagB);
          cVar = !!(decimalNumber & this.flagC);
          if (this.nVars == 3) {
            evaluation = expression.evaluate({ A: aVar, B: bVar, C: cVar });
          }
          if (this.nVars == 4) {
            dVar = !!(decimalNumber & this.flagD);
            evaluation = expression.evaluate({ A: aVar, B: bVar, C: cVar, D: dVar });
          }
          evaluations[i][j] = (evaluation) ? 1 : 0;
        }
      }
      // that should never happen as the query was first validated in the form component
    } catch (err) {
      console.log(err);
    }

    return evaluations;
  }

  cellsToMap(marked: number[]): number[][] {
    return this.cellIds.map(row => row.map(cell => (marked) ? +marked.includes(cell) : 0 ));
  }

  mapToCells(map: number[][]): number[] {
    let result = [];
    for (let i in map) {
      for (let j in map[i]) {
        if (map[i][j] != 0) {
          if (this.cellIds[i][j] != undefined) {
            result.push(this.cellIds[i][j]);
          }
        }
      }
    }
    return result;
  }

  getExpressionAtSquare(offRow: number, offCol: number): ExpressionGroup {
    if (offRow < 0 || offCol < 0) { throw new Error('Negative coordinates'); }

    let nRow = this.cellIds.length;
    let nCol = this.cellIds[0].length;

    let decimalNumber = this.cellIds[offRow % nRow][offCol % nCol];

    let varA = !!(decimalNumber & this.flagA);
    let varB = !!(decimalNumber & this.flagB);
    let varC = !!(decimalNumber & this.flagC);
    let varD = (this.flagD != undefined) ? !!(decimalNumber & this.flagD) : null;

    return new ExpressionGroup(varA, varB, varC, varD);
  }

  mapToExpression(map: number[][]): ExpressionGroup {
    if (map.length != this.cellIds.length || map[0].length != this.cellIds[0].length) {
      throw new Error ('Non-matching dimensions');
    }

    if (map.every(row => row.every(cell => cell == 1))) {
      return new ExpressionGroup(null, null, null, null);
    }

    if (map.every(row => row.every(cell => cell == 0))) {
      return new ExpressionGroup(true, true, true, true);
    }

    let firstExpression: ExpressionGroup;
    let nextExpression: ExpressionGroup;

    let resultGroup: ExpressionGroup;

    let nRow = this.cellIds.length;
    let nCol = this.cellIds[0].length;

    for (let i = 0; i < nRow; i++) {
      for (let j = 0; j < nCol; j++) {
        if (map[i][j] == 1) {
          if (firstExpression == undefined) {
            firstExpression = this.getExpressionAtSquare(i, j);
            resultGroup = firstExpression;
          } else {
            nextExpression = this.getExpressionAtSquare(i, j);
            resultGroup = firstExpression.compareForScanning(nextExpression);
            firstExpression = resultGroup;
          }
        }
      }
    }

    if (resultGroup.equals(new ExpressionGroup(null, null, null, null))) {
      throw new Error('Marked cells do not make up one group');
    }

    return resultGroup;
  }


  // TODO might be a duplicate of the method below: expressionGroupToCells()
  // return cells for which the expression evaluates to true
  markExpression(expression: ExpressionGroup): number[] {
    let aVar: boolean;
    let bVar: boolean;
    let cVar: boolean;
    let dVar: boolean;
    let contained: boolean;

    let result = [];

    for (let row of this.cellIds) {
      for (let cell of row) {
        aVar = !!(cell & this.flagA);
        bVar = !!(cell & this.flagB);
        cVar = !!(cell & this.flagC);
        if (this.flagD != undefined) {
          dVar = !!(cell & this.flagD);
        }

        contained = (new ExpressionGroup(aVar, bVar, cVar, dVar)).containedIn(expression);

        if (contained) { result.push(cell); }
      }
    }

    return result;

  }

  // find for which cells (their IDs) the expression evaluates to true
  expressionGroupToCells(expression: ExpressionGroup): number[] {
    let result = [];
    for (let row of this.cellIds) {
      for (let cell of row) {
        if (expression.aVar != null) {
          if (!!(cell & this.flagA) != expression.aVar) {
            continue;
          }
        }
        if (expression.bVar != null) {
          if (!!(cell & this.flagB) != expression.bVar) {
            continue;
          }
        }
        if (expression.cVar != null) {
          if (!!(cell & this.flagC) != expression.cVar) {
            continue;
          }
        }
        if (this.flagD != null && expression.dVar != null) {
          if (!!(cell & this.flagD) != expression.dVar) {
            continue;
          }

        }
        result.push(cell);
      }
    }
    return result;
  }

}
