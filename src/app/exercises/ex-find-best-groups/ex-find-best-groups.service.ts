import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

export class ExFindBestGroups {
  id: number;
  points: number;

  constructor(id: number, points: number) {
    this.id = id;
    this.points = points;
  }
}

let EXERCISES = [
  new ExFindBestGroups(1, 1)
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
