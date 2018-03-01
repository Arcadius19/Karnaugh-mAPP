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
  name: string;
  route: string;
  EXERCISES: Exercise[];
  isSingleton: boolean;

  constructor(id: number, name: string, route: string, exercises: Exercise[], isSingleton?: boolean) {
    this.id = id;
    this.EXERCISES = exercises;
    this.name = name;
    this.route = route;
    this.isSingleton = !!(isSingleton) ;
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

  getStoragePrefix(): string {
    return 'ex' + this.id + 'q';
  }

  addPointsToTotal(qID: number, points: number) {
    let questionKey = this.getStoragePrefix() + qID;
    let currentState = localStorage.getItem(questionKey);

    if (!currentState) {
      localStorage.setItem('totalPoints', String(+localStorage.getItem('totalPoints') + points));
      let questionItem = {
        points: points,
        attemptsUntilCorrect: 1,
        attempts: 1
      };
      localStorage.setItem(questionKey, JSON.stringify(questionItem));
    } else {
      let currentStateObject = JSON.parse(currentState);
      localStorage.setItem('totalPoints', String(+localStorage.getItem('totalPoints') + points));
      currentStateObject.attempts++;
      if (currentStateObject.points != points) {
        currentStateObject.points = points;
        currentStateObject.attemptsUntilCorrect = currentStateObject.attempts;
      }
      localStorage.setItem(questionKey, JSON.stringify(currentStateObject));
    }
  }

  addAttempt(qID: number) {
    let questionKey = this.getStoragePrefix() + qID;
    let currentState = localStorage.getItem(questionKey);
    if (!currentState) {
      let questionItem = {
        points: 0,
        attempts: 1
      };
      localStorage.setItem(questionKey, JSON.stringify(questionItem));
    } else {
      let currentStateObject = JSON.parse(currentState);
      if (currentStateObject.attempts) {
        currentStateObject.attempts++;
        localStorage.setItem(questionKey, JSON.stringify(currentStateObject));
      }
    }
  }

  getBasic() {
    let result = {
      id: this.id,
      name: this.name,
      route: this.route,
      isSingleton: this.isSingleton,
      questions: this.EXERCISES.map(exercise => exercise.getBasic())
    };

    return result;
  }

}
