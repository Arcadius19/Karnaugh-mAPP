import {ExpressionGroup} from '../expression-group';

export class Exercise {
  id: number;
  points: number;

  expression: string;                 // Expr-to-kmap

  cells: number[];                    // Find-best-groups, Kmap-to-expr
  nVars: number;

  expressionGroup: ExpressionGroup;   // Name-group

  constructor(id: number, points: number) {
    this.id = id;
    this.points = points;
  }
}
