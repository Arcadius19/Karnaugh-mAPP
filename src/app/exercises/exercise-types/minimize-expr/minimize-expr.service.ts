import { Injectable } from '@angular/core';
import {ExerciseService, ExericseID} from '../../exercise.service';
import {Exercise} from '../../exercise';
import {MathJax} from '../../../auxiliary/mathjax-aux/math-jax';

export class ExMinimizeExpr extends Exercise {
  static currentPracticeID = 1;
  static currentQuizID = 1;

  constructor(expression: string, points: number, isQuiz = false) {
    let id: number;
    if (isQuiz) {
      id = ExMinimizeExpr.currentQuizID;
      ExMinimizeExpr.currentQuizID++;
    } else {
      id = ExMinimizeExpr.currentPracticeID;
      ExMinimizeExpr.currentPracticeID++;
    }

    super(id, points);
    this.expression = expression;
    this.name = id + '. ' + MathJax.toBrowserText(expression);
  }
}

let EXERCISES_TEST = [
  new ExMinimizeExpr('A and D or C', 4, true),
  new ExMinimizeExpr('A and B => C', 5, true),
  new ExMinimizeExpr('D <=> A or C', 5, true),
  new ExMinimizeExpr('(B <=> C) or C and (D => A)', 7, true),
];

let EXERCISES_PRACTICE = [
  new ExMinimizeExpr('A and B or C', 0),
  new ExMinimizeExpr('C and B => D', 0),
  new ExMinimizeExpr('A <=> C or D', 0),
  new ExMinimizeExpr('(A <=> B) or C and (B => D)', 0),
];

@Injectable()
export class MinimizeExprService extends ExerciseService {

  constructor() {
    super(ExericseID.MINIMIZE_EXPR, 'Minimize Expression', 'minimize-expr', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
