import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {GridGroup} from '../../grid-group';
import {ExpressionGroup} from '../../expression-group';

export class ExNameGroup {
  id: number;
  points: number;
  expression: ExpressionGroup;

  constructor(id: number, points: number, expression: ExpressionGroup) {
    this.id = id;
    this.points = points;
    this.expression = expression;
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
export class ExNameGroupService {

  constructor() { }

  getExercises() {
    return EXERCISES;
  }

  getExercise(id: number | string) {
    return this.getExercises().find(exercise => exercise.id == +id);
  }

  getExercisesAsync() {
    return Observable.of(EXERCISES);
  }

  getExerciseAsync(id: number | string) {
    return this.getExercisesAsync().map(exercises => exercises.find(exercise => exercise.id == +id));
  }

}
