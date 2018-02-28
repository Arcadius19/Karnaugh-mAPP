import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ExerciseService, ExericseID} from '../exercise.service';
import {Exercise} from '../exercise';

export class ExExprToKmap extends Exercise {
  expression: string;

  constructor(id: number, expression: string, points: number) {
    super(id, points);
    this.expression = expression;
  }
}

let EXERCISES = [
  new ExExprToKmap(1, 'A', 1),
  new ExExprToKmap(2, 'A or B', 2),
  new ExExprToKmap(3, 'A and C', 2),
  new ExExprToKmap(4, 'A <=> B', 2),
  new ExExprToKmap(5, 'B => D', 2),
  new ExExprToKmap(6, 'A or C <=> D', 3),
];

@Injectable()
export class ExExprToKmapService extends ExerciseService {

  constructor() {
    super(ExericseID.EXPR_TO_KMAP, EXERCISES);
  }

}
