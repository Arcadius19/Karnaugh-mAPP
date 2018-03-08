import {ExpressionGroup} from '../auxiliary/expression-group';

export class Exercise {
  id: number;
  points: number;
  name: string;
  completed: boolean;

  expression: string;                 // Expr-to-kmap

  cells: number[];                    // Find-best-groups, Kmap-to-expr
  nVars: number;

  expressionGroup: ExpressionGroup;   // Name-group

  constructor(id: number, points: number) {
    this.id = id;
    this.points = points;
  }

  getBasic() {
    let result = {
      id: this.id,
      points: this.points,
      name: this.name,
      completed: null
    };

    return result;
  }
}
