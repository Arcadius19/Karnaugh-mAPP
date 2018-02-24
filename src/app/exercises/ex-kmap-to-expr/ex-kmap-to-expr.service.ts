import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

export class ExKmapToExpr {
  id: number;
  points: number;
  expression: string;

  constructor(id: number, points: number, expression: string) {
    this.id = id;
    this.points = points;
    this.expression = expression;
  }
}

let EXERCISES = [
  new ExKmapToExpr(1, 1, 'D'),
  new ExKmapToExpr(2, 2, 'A and C'),
  new ExKmapToExpr(3, 3, '(A and C) or (B and not C)'),
  new ExKmapToExpr(4, 3, '(A and B and D) or (not A and not C)')
];

@Injectable()
export class ExKmapToExprService {

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
