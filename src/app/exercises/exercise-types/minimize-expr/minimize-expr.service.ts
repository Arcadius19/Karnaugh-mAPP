import { Injectable } from '@angular/core';
import {ExerciseService, ExericseID} from '../../exercise.service';
import {Exercise} from '../../exercise';
import {MathJaxConverter} from '../../../auxiliary/mathjax-aux/math-jax-converter';

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
    this.name = id + '. ' + MathJaxConverter.toBrowserText(expression);
  }
}

let EXERCISES_TEST = [
  new ExMinimizeExpr('A and D or C', 4, true),
  new ExMinimizeExpr('A ? B : D', 5, true),
  new ExMinimizeExpr('A and B => C', 6, true),
  new ExMinimizeExpr('D <=> A or C', 6, true),
  new ExMinimizeExpr('B => C => A => B', 8, true),
  new ExMinimizeExpr('B ? (A and C) : not D', 9, true),
  new ExMinimizeExpr('(B <=> C) or C and (D => A)', 9, true),
  new ExMinimizeExpr('B <=> C or D => A', 10, true),
  new ExMinimizeExpr('A <=> not B => not C <=> D', 10, true),
  new ExMinimizeExpr('not A ? (B => C) : (D <=> A)', 10, true)
];

let EXERCISES_PRACTICE = [
  new ExMinimizeExpr('A and B or C', null),
  new ExMinimizeExpr('C and B => D', null),
  new ExMinimizeExpr('A <=> C or D', null),
  new ExMinimizeExpr('D ? not C : A', null),
  new ExMinimizeExpr('A and not B or C and B', null),
  new ExMinimizeExpr('A => B => A', null),
  new ExMinimizeExpr('A ? not B : (B <=> C)', null),
  new ExMinimizeExpr('A and not C or C and B or (not A and not B and C)', null),
  new ExMinimizeExpr('(A <=> B) or C and (B => D)', null),
  new ExMinimizeExpr('(B <=> C) ? not D : (A => C)', null)
];

// @Injectable()
export class MinimizeExprService extends ExerciseService {

  constructor() {
    super(ExericseID.MINIMIZE_EXPR, 'Minimise Expression', 'minimise-expr', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
