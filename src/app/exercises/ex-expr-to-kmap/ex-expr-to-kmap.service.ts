import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

export class ExExprToKmap {
  id: number;
  points: number;
  expression: string;

  constructor(id: number, expression: string, points: number) {
    this.id = id;
    this.expression = expression;
    this.points = points;
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
export class ExExprToKmapService {

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