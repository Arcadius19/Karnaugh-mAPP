import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Exercise} from './exercise';

export class ExericseID {
  static LABEL        = 0;
  static EXPR_TO_KMAP = 1;
  static FIND_BEST    = 2;
  static NAME_GROUP   = 3;
  static KMAP_TO_EXPR = 4;
}

@Injectable()
export class ExerciseService {
  id: number;
  EXERCISES: Exercise[];

  constructor(id: number, exercises: Exercise[]) {
    this.id = id;
    this.EXERCISES = exercises;
  }

  getExercises() {
    return this.EXERCISES;
  }

  getExercise(id: number | string) {
    return this.getExercises().find(exercise => exercise.id == +id);
  }

  getExercisesAsync() {
    return Observable.of(this.EXERCISES);
  }

  getExerciseAsync(id: number | string) {
    return this.getExercisesAsync().map(exercises => exercises.find(exercise => exercise.id == +id));
  }

  addPointsToTotal(questionID: number, points: number) {
    let questionKey = 'ex' + this.id + 'q' + questionID;

    if (!localStorage.getItem(questionKey)) {
      localStorage.setItem('totalPoints', String(+localStorage.getItem('totalPoints') + points));
      localStorage.setItem(questionKey, 'success');
    }
  }

}
