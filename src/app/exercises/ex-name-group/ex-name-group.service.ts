import { Injectable } from '@angular/core';
import {ExpressionGroup} from '../../expression-group';
import {Exercise} from '../exercise';
import {ExerciseService, ExericseID} from '../exercise.service';

export class ExNameGroup extends Exercise {

  constructor(id: number, points: number, expression: ExpressionGroup) {
    super(id, points);
    this.expressionGroup = expression;
    this.name = `Set ${id}`;
  }
}

let EXERCISES = [
  new ExNameGroup(1, 1, new ExpressionGroup(true, null, null, null)),
  new ExNameGroup(2, 1, new ExpressionGroup(true, false, null, null)),
  new ExNameGroup(3, 1, new ExpressionGroup(null, false, true, null)),
  new ExNameGroup(4, 1, new ExpressionGroup(true, false, false, true)),
  new ExNameGroup(5, 1, new ExpressionGroup(false, false, null, false))
];

@Injectable()
export class ExNameGroupService extends ExerciseService {

  constructor() {
    super(ExericseID.NAME_GROUP, 'Name the Group', 'name-group', EXERCISES);
  }

}
