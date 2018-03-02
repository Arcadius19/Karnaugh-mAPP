import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {Exercise} from '../../exercise';
import {ExerciseService, ExericseID} from '../../exercise.service';
import {GlobalVariables} from '../../../auxiliary/global-variables';

export class ExKmapToExpr extends Exercise {

  constructor(id: number, points: number, cells: number[]) {
    super(id, points);
    this.cells = cells;
    this.name = `Set ${id}`;
  }
}

let kmap = new KarnaughMap();

let EXERCISES_TEST = [
  new ExKmapToExpr(1, 1, kmap.mapToCells(kmap.evaluate('D'))),
  new ExKmapToExpr(2, 2, kmap.mapToCells(kmap.evaluate('A and C'))),
  new ExKmapToExpr(3, 3, kmap.mapToCells(kmap.evaluate('(A and C) or (B and not C)'))),
  new ExKmapToExpr(4, 3, kmap.mapToCells(kmap.evaluate('(A and B and D) or (not A and not C)'))),
  new ExKmapToExpr(5, 4, [0, 4, 2, 6, 5, 7, 13, 15])
];

let EXERCISES_PRACTICE = [
  new ExKmapToExpr(1, 1, kmap.mapToCells(kmap.evaluate('D'))),
  new ExKmapToExpr(2, 3, kmap.mapToCells(kmap.evaluate('(A and D and D) or (not B and not C)'))),
  new ExKmapToExpr(3, 4, [0, 4, 1, 8, 5, 7, 13, 15])
];

@Injectable()
export class ExKmapToExprService extends ExerciseService {

  constructor() {
    super(ExericseID.KMAP_TO_EXPR, 'Karnaugh Map to Expression', 'kmap-to-expr', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
