import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ExerciseService, ExericseID} from '../../exercise.service';
import {Exercise} from '../../exercise';
import {MathJaxConverter} from '../../../auxiliary/mathjax-aux/math-jax-converter';

export class ExExprToKmap extends Exercise {
  static currentPracticeID = 1;
  static currentQuizID = 1;

  expression: string;
  name: string;

  constructor(expression: string, points: number, isQuiz = false) {
    let id: number;
    if (isQuiz) {
      id = ExExprToKmap.currentQuizID;
      ExExprToKmap.currentQuizID++;
    } else {
      id = ExExprToKmap.currentPracticeID;
      ExExprToKmap.currentPracticeID++;
    }

    super(id, points);
    this.expression = expression;
    this.name = id + '. ' + MathJaxConverter.toBrowserText(expression);
  }
}

let EXERCISES_TEST = [
  new ExExprToKmap('D', 1, true),
  new ExExprToKmap('A or B', 2, true),
  new ExExprToKmap('B or D', 2, true),
  new ExExprToKmap('C or not C', 2, true),
  new ExExprToKmap('A and C', 2, true),
  new ExExprToKmap('A <=> B', 2, true),
  new ExExprToKmap('B => D', 2, true),
  new ExExprToKmap('D ? A : B', 3, true),
  new ExExprToKmap('A or C <=> D', 3, true),
  new ExExprToKmap('(A or not C) and (not D or C)', 3, true),
  new ExExprToKmap('D and C <=> B => A', 4, true),
  new ExExprToKmap('A <=> not B <=> C', 4, true),
  new ExExprToKmap('D <=> B <=> A <=> C', 4, true),
  new ExExprToKmap('not A <=> C => B <=> D', 5, true),
  new ExExprToKmap('A ? (B  <=> C) : not D', 5, true)
];

let EXERCISES_PRACTICE = [
  new ExExprToKmap('A', null),
  new ExExprToKmap('C or B', null),
  new ExExprToKmap('A or D', null),
  new ExExprToKmap('B and not B', null),
  new ExExprToKmap('A and D', null),
  new ExExprToKmap('A <=> B', null),
  new ExExprToKmap('D => C', null),
  new ExExprToKmap('A ? B : C', null),
  new ExExprToKmap('B or A <=> C', null),
  new ExExprToKmap('(A or not D) and (B or D)', null),
  new ExExprToKmap('B and C <=> A => C', null),
  new ExExprToKmap('C <=> B <=> D', null),
  new ExExprToKmap('D <=> C <=> B <=> A', null),
  new ExExprToKmap('A <=> B => D <=> C', null),
  new ExExprToKmap('A ? (B  => C) : D', null)
];

// @Injectable()
export class ExExprToKmapService extends ExerciseService {

  constructor() {
    super(ExericseID.EXPR_TO_KMAP, 'Expression to Karnaugh Map', 'expr-to-kmap', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
