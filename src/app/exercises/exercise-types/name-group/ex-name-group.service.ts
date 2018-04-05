import { Injectable } from '@angular/core';
import {ExpressionGroup} from '../../../auxiliary/expression-group';
import {Exercise} from '../../exercise';
import {ExerciseService, ExericseID} from '../../exercise.service';

export class ExNameGroup extends Exercise {
  static currentPracticeID = 1;
  static currentQuizID = 1;

  constructor(expression: ExpressionGroup, points: number, isQuiz = false) {
    let id: number;
    if (isQuiz) {
      id = ExNameGroup.currentQuizID;
      ExNameGroup.currentQuizID++;
    } else {
      id = ExNameGroup.currentPracticeID;
      ExNameGroup.currentPracticeID++;
    }
    super(id, points);
    this.expressionGroup = expression;
    this.name = `Set ${id}`;
  }
}

let EXERCISES_TEST = [
  new ExNameGroup(new ExpressionGroup(true, null, null, null), 1, true),
  new ExNameGroup(new ExpressionGroup(true, false, null, null), 2, true),
  new ExNameGroup(new ExpressionGroup(true, true, true, true), 2, true),
  new ExNameGroup(new ExpressionGroup(true, false, false, true), 2, true),
  new ExNameGroup(new ExpressionGroup(true, null, false, false), 2, true),
  new ExNameGroup(new ExpressionGroup(null, false, true, null), 3, true),
  new ExNameGroup(new ExpressionGroup(false, true, null, false), 3, true),
  new ExNameGroup(new ExpressionGroup(null, false, null, false), 3, true)
];

let EXERCISES_PRACTICE = [
  new ExNameGroup(new ExpressionGroup(null, null, true, null), null),
  new ExNameGroup(new ExpressionGroup(false, null, null, true), null),
  new ExNameGroup(new ExpressionGroup(false, false, false, false), null),
  new ExNameGroup(new ExpressionGroup(true, false, false, null), null),
  new ExNameGroup(new ExpressionGroup(false, true, true, false), null),
  new ExNameGroup(new ExpressionGroup(true, true, null, false), null),
  new ExNameGroup(new ExpressionGroup(null, null, null, null), null),
  new ExNameGroup(new ExpressionGroup(null, false, null, true), null),
];

@Injectable()
export class ExNameGroupService extends ExerciseService {

  constructor() {
    super(ExericseID.NAME_GROUP, 'Name the Group', 'name-group', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
