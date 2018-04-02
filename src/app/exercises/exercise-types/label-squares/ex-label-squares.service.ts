import { Injectable } from '@angular/core';
import {ExerciseService, ExericseID} from '../../exercise.service';
import {Exercise} from '../../exercise';

export class ExLabelSquares extends Exercise {

  constructor() {
    super(1, 2);
    this.name = 'Label squares';
  }

}

// Single instance of the exercise
let EXERCISES = [new ExLabelSquares()];

// @Injectable()
export class ExLabelSquaresService extends ExerciseService {

  constructor() {
    super(ExericseID.LABEL, 'Label Squares', 'label-squares', EXERCISES, EXERCISES, true);
  }

}
