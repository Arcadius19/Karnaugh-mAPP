import { Injectable } from '@angular/core';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {Exercise} from '../../exercise';
import {ExerciseService, ExericseID} from '../../exercise.service';

export class ExKmapToExpr extends Exercise {
  static currentPracticeID = 1;
  static currentQuizID = 1;

  constructor(cells: number[], points: number, isQuiz = false) {
    let id: number;
    if (isQuiz) {
      id = ExKmapToExpr.currentQuizID;
      ExKmapToExpr.currentQuizID++;
    } else {
      id = ExKmapToExpr.currentPracticeID;
      ExKmapToExpr.currentPracticeID++;
    }

    super(id, points);
    this.cells = cells;
    this.name = `Set ${id}`;
  }
}

let kmap = new KarnaughMap();

let EXERCISES_TEST = [
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('D')), 3, true),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('A and C')), 4, true),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('(A and C) or (B and not C)')), 5, true),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('(A and B and D) or (not A and not C)')), 5, true),
  new ExKmapToExpr([1, 3, 6, 14, 9, 11, 4, 12], 5, true),
  new ExKmapToExpr([4, 12, 8, 13, 15, 6, 14, 10], 6, true),
  new ExKmapToExpr([0, 4, 2, 6, 5, 7, 13, 15], 6, true),
  new ExKmapToExpr([0, 4, 8, 2, 6, 5, 7, 13, 15, 10], 7, true),
  new ExKmapToExpr([0, 8, 9, 6, 14, 10], 7, true),
  new ExKmapToExpr([1, 4, 5, 7, 12, 15, 14, 8, 9], 8, true),
  new ExKmapToExpr([0, 2, 4, 5, 7, 12, 13, 15, 14, 9], 8, true),
  new ExKmapToExpr([3, 4, 5, 6, 13, 15, 14, 8, 11, 10], 9, true),
];

let EXERCISES_PRACTICE = [
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('B')), null),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('A and C')), null),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('(A and D) or (not B and not C)')), null),
  new ExKmapToExpr(kmap.mapToCells(kmap.evaluate('(B and not C and D) or (not A and B)')), null),
  new ExKmapToExpr([0, 4, 1, 8, 5, 7, 13, 15], null),
  new ExKmapToExpr([0, 1, 3, 2, 6, 7, 8, 9, 12, 13], null),
  new ExKmapToExpr([5, 7, 6, 13, 14, 8, 9, 10], null),
  new ExKmapToExpr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], null),
  new ExKmapToExpr([1, 2, 4, 7, 6, 13, 8, 9], null),
  new ExKmapToExpr([0, 1, 3, 5, 6, 12, 15, 8, 9, 11], null),
];

// @Injectable()
export class ExKmapToExprService extends ExerciseService {

  constructor() {
    super(ExericseID.KMAP_TO_EXPR, 'Karnaugh Map to Expression', 'kmap-to-expr', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
