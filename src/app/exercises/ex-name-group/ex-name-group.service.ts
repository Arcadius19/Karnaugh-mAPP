import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {GridGroup} from '../../grid-group';
import {catchError} from 'rxjs/operators';
import {calcDaysCalendar} from 'ngx-bootstrap/datepicker/engine/calc-days-calendar';

export class ExNameGroup {
  id: number;
  points: number;
  cells: number[];

  constructor(id: number, points: number, cells: number[]) {
    this.id = id;
    this.points = points;
    if (GridGroup.checkIfCellsGrid(cells)) {
      this.cells = cells;
    } else {
      throw new Error('Provided cells cannot form a group');
    }
  }
}

let candidates = [
  {points: 1, cells: [0, 1, 4, 5]},
  {points: 1, cells: [1, 2, 3, 4]},
  {points: 1, cells: [4, 5, 7, 6, 12, 13, 15, 14]},
];

let EXERCISES = [];

let index = 1;
for (let candidate of candidates) {
  try {
    EXERCISES.push(new ExNameGroup(index, candidate.points, candidate.cells));
    index++;
  } catch (err) { }
}

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
