import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class ExNameGroup {
  id: number;
  points: number;
  cells: number[];

  constructor(id: number, points: number, cells: number[]) {
    this.id = id;
    this.points = points;
    this.cells = cells;
  }
}

let EXERCISES = [
  new ExNameGroup(1, 1, [1, 2, 4, 5])
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
