import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export class ExFindBestGroups {
  id: number;
  points: number;
  cells: number[];
  nVars = 4;

  constructor(id: number, points: number, cells: number[], nVars?: number) {
    this.id = id;
    this.points = points;
    if (nVars == 3) { this.nVars = nVars; }
    this.cells = cells.filter(cell => cell < Math.pow(2, this.nVars));
  }
}

let EXERCISES = [
  new ExFindBestGroups(1, 1, [1, 2, 3, 4]),
  new ExFindBestGroups(2, 2, [0, 1, 4, 5, 15, 14, 11, 10]),
  new ExFindBestGroups(3, 2, [7, 6, 15, 14, 12, 13, 8, 9]),
  new ExFindBestGroups(4, 2, [0, 4, 2, 6], 3)
];

@Injectable()
export class ExFindBestGroupsService {

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
