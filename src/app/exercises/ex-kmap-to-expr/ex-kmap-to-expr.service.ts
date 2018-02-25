import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../karnaugh-map';

export class ExKmapToExpr {
  id: number;
  points: number;
  cells: number[];

  constructor(id: number, points: number, cells: number[]) {
    this.id = id;
    this.points = points;
    this.cells = cells;
  }
}

let kmap = new KarnaughMap();

let EXERCISES = [
  new ExKmapToExpr(1, 1, kmap.mapToCells(kmap.evaluate('D'))),
  new ExKmapToExpr(2, 2, kmap.mapToCells(kmap.evaluate('A and C'))),
  new ExKmapToExpr(3, 3, kmap.mapToCells(kmap.evaluate('(A and C) or (B and not C)'))),
  new ExKmapToExpr(4, 3, kmap.mapToCells(kmap.evaluate('(A and B and D) or (not A and not C)'))),
  new ExKmapToExpr(5, 4, [0, 4, 2, 6, 5, 7, 13, 15])
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
