import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Exercise} from './exercise';
import {Subject} from 'rxjs/Subject';

export class ExericseID {
  static LABEL          = 0;
  static EXPR_TO_KMAP   = 1;
  static FIND_BEST      = 2;
  static NAME_GROUP     = 3;
  static KMAP_TO_EXPR   = 4;
  static MINIMIZE_EXPR  = 5;
}

// @Injectable()
export class ExerciseService {
  id: number;
  name: string;
  route: string;
  EXERCISES_TEST: Exercise[];
  EXERCISES_PRACTICE: Exercise[];
  isSingleton: boolean;

  private completionUpdateSource = new Subject<number>();
  completionUpdate$ = this.completionUpdateSource.asObservable();

  constructor(id: number, name: string, route: string, exercisesTest: Exercise[], exercisesPractice: Exercise[], isSingleton?: boolean) {
    this.id = id;
    this.EXERCISES_TEST = exercisesTest;
    this.EXERCISES_PRACTICE = exercisesPractice;
    this.name = name;
    this.route = route;
    this.isSingleton = !!(isSingleton) ;
  }

  static checkIfCompleted(exID: number, qID: number): boolean {
    let questionKey = 'ex' + exID + 'q' + qID;
    let currentState = localStorage.getItem(questionKey);
    if (!currentState) { return false; }

    let currentStateObject = JSON.parse(currentState);
    return currentStateObject.attemptsUntilCorrect != null;

  }

  getExercisesTest() {
    return this.EXERCISES_TEST;
  }

  getExerciseTest(id: number | string) {
    return this.getExercisesTest().find(exercise => exercise.id == +id);
  }

  getExercisesTestAsync() {
    return Observable.of(this.EXERCISES_TEST);
  }

  getExerciseTestAsync(id: number | string) {
    return this.getExercisesTestAsync().map(exercises => exercises.find(exercise => exercise.id == +id));
  }

  getExercisesPractice() {
    return this.EXERCISES_PRACTICE;
  }

  getExercisePractice(id: number | string) {
    return this.getExercisesPractice().find(exercise => exercise.id == +id);
  }

  getExercisesPracticeAsync() {
    return Observable.of(this.EXERCISES_PRACTICE);
  }

  getExercisePracticeAsync(id: number | string) {
    return this.getExercisesPracticeAsync().map(exercises => exercises.find(exercise => exercise.id == +id));
  }

  getStoragePrefix(): string {
    return 'ex' + this.id + 'q';
  }

  addPointsToTotal(qID: number, points: number) {
    if (localStorage == undefined) { return; }

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
      this.completionUpdateSource.next(qID);
    } else {
      let currentStateObject = JSON.parse(currentState);
      currentStateObject.attempts++;
      if (currentStateObject.points != points) {
        localStorage.setItem('totalPoints', String(+localStorage.getItem('totalPoints') + points));
        currentStateObject.points = points;
        currentStateObject.attemptsUntilCorrect = currentStateObject.attempts;
        this.completionUpdateSource.next(qID);
      }
      localStorage.setItem(questionKey, JSON.stringify(currentStateObject));
    }
  }

  addAttempt(qID: number) {
    if (localStorage == undefined) { return; }

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

  getBasicTest() {
    let result = {
      id: this.id,
      name: this.name,
      route: this.route,
      isSingleton: this.isSingleton,
      questions: this.EXERCISES_TEST.map(exercise => exercise.getBasic())
    };

    return result;
  }

  getBasicPractice() {
    let result = {
      id: this.id,
      name: this.name,
      route: this.route,
      isSingleton: this.isSingleton,
      questions: this.EXERCISES_PRACTICE.map(exercise => exercise.getBasic())
    };

    return result;
  }

}
