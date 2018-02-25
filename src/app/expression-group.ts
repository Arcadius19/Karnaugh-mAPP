import {GridGroup} from './grid-group';
import {MathJax} from './mathjax-aux/math-jax';
import {KarnaughMap} from './karnaugh-map';

export class ExpressionGroup {
  aVar: boolean;
  bVar: boolean;
  cVar: boolean;
  dVar: boolean;

  constructor(aVar: boolean, bVar: boolean, cVar: boolean, dVar: boolean) {
    this.aVar = aVar;
    this.bVar = bVar;
    this.cVar = cVar;
    this.dVar = dVar;
  }

  static findMinimal(expressions: ExpressionGroup[]): ExpressionGroup[] {
    let index = 0;
    indexLoop:
      while (index < expressions.length) {
        for (let i = 0; i < expressions.length; i++) {
          for (let j = i + 1; j < expressions.length; j++) {
            if (index != i && index != j) {
              if (expressions[index].containedIn(expressions[i].resolute(expressions[j]))) {
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

  // TO-TEXT METHODS ======================

  static toMathJaxAux(variable: boolean, char: string, connector: string, notNegate = true): string {
    let resultString = '';
    if (variable == notNegate) {
      resultString = connector + char;
    } else if (variable == !notNegate) {
      resultString = connector + 'not ' + char;
    }

    return resultString;
  }

  static toWholeSolution(groups: ExpressionGroup[], dnfType = true): string {
    let connector = dnfType ? ' or ' : ' and ';
    let result = groups[0].toMathJax(dnfType);

    for (let i = 1; i < groups.length; i++) {
      result = '(' + result + ')' + connector + '(' + groups[i].toMathJax(dnfType) + ')';
    }

    return MathJax.toMathJax(result);
  }

  toString(): string {
    return ('A: ' + this.aVar + ', B: ' + this.bVar + ', C: ' + this.cVar + ', D: ' + this.dVar);
  }

  toMathJax(product = true): string {
    let connector = product ? ' and ' : ' or ';
    let resultString =
      ExpressionGroup.toMathJaxAux(this.aVar, 'A', connector) +
      ExpressionGroup.toMathJaxAux(this.bVar, 'B', connector) +
      ExpressionGroup.toMathJaxAux(this.cVar, 'C', connector) +
      ExpressionGroup.toMathJaxAux(this.dVar, 'D', connector);

    console.log('this: ', this);
    console.log(resultString);

    if (resultString == '') {
      resultString = '1';
    } else {
      resultString = resultString.slice(connector.length);
    }

    return MathJax.toMathJax(resultString);
  }

  // COMPARING METHODS ======================

  equals(expression: ExpressionGroup): boolean {
    if (this.aVar != expression.aVar) { return false; }
    if (this.bVar != expression.bVar) { return false; }
    if (this.cVar != expression.cVar) { return false; }
    if (this.dVar != expression.dVar) { return false; }

    return true;
  }

  containedIn(expression: ExpressionGroup): boolean {
    if (expression.aVar != null && this.aVar != expression.aVar) { return false; }
    if (expression.bVar != null && this.bVar != expression.bVar) { return false; }
    if (expression.cVar != null && this.cVar != expression.cVar) { return false; }
    if (expression.dVar != null && this.dVar != expression.dVar) { return false; }

    return true;
  }

  // compare values of variables, if changes set ot null - does not matter when scanning squares
  compare(expression: ExpressionGroup): ExpressionGroup {
    let aVar = (this.aVar == expression.aVar) ? this.aVar : null;
    let bVar = (this.bVar == expression.bVar) ? this.bVar : null;
    let cVar = (this.cVar == expression.cVar) ? this.cVar : null;
    let dVar = (this.dVar == expression.dVar) ? this.dVar : null;

    return new ExpressionGroup(aVar, bVar, cVar, dVar);
  }

  resolute(expression: ExpressionGroup): ExpressionGroup {
    let result = new ExpressionGroup(null, null, null, null);

    result.aVar = (this.aVar == expression.aVar) ? this.aVar : null;
    result.bVar = (this.bVar == expression.bVar) ? this.bVar : null;
    result.cVar = (this.cVar == expression.cVar) ? this.cVar : null;
    result.dVar = (this.dVar == expression.dVar) ? this.dVar : null;

    return result;
  }

  // CONVERTING METHODS ======================

  toGridGroup(nVars = 4): GridGroup {
    if (nVars != 3 && nVars != 4) { return null; }

    let kmap = new KarnaughMap(nVars);

    let nRow = kmap.cellIds.length;
    let nCol = kmap.cellIds[0].length;

    let candidate: GridGroup;

    // Check 16x
    if (nRow == 4) {
      candidate = new GridGroup(0, 0, 4, 4);
      if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
    }

    // Check 8x
    if (nRow == 2) {
      candidate = new GridGroup(0, 0, 2, 4);
      if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
    } else {
      for (let i = 0; i < nRow; i++) {
        candidate = new GridGroup(i, 0, 2, 4);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
      }
      for (let j = 0; j < nCol; j++) {
        candidate = new GridGroup(0, j, 4, 2);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
      }
    }

    // Check 4x
    for (let i = 0; i < nRow; i++) {
      candidate = new GridGroup(i, 0, 1, 4);
      if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
    }
    if (nRow == 2) {
      for (let j = 0; j < nCol; j++) {
        candidate = new GridGroup(0, j, 2, 2);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
      }
    } else {
      for (let j = 0; j < nCol; j++) {
        candidate = new GridGroup(0, j, 4, 1);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
      }
      for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
          candidate = new GridGroup(i, j, 2, 2);
          if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
        }
      }
    }

    // Check 2x
    if (nRow == 2) {
      for (let j = 0; j < nCol; j++) {
        candidate = new GridGroup(0, j, 2, 1);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }

        for (let i = 0; i < nRow; i++) {
          candidate = new GridGroup(i, j, 1, 2);
          if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
        }
      }
    } else {
      for (let i = 0; i < nRow; i++) {
        for (let j = 0; j < nCol; j++) {
          candidate = new GridGroup(i, j, 1, 2);
          if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }

          candidate = new GridGroup(i, j, 2, 1);
          if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
        }
      }
    }

    // Check 1x
    for (let i = 0; i < nRow; i++) {
      for (let j = 0; j < nCol; j++) {
        candidate = new GridGroup(1, 1, 1, 1);
        if (this.equals(candidate.toExpressionGroup(nVars))) { return candidate; }
      }
    }

  }

}
