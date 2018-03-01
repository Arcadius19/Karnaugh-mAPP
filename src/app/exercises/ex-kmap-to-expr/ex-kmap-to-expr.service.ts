import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../karnaugh-map';
import {Exercise} from '../exercise';
import {ExerciseService, ExericseID} from '../exercise.service';
import {GlobalVariables} from '../../global-variables';

export class ExKmapToExpr extends Exercise {

  constructor(id: number, points: number, cells: number[]) {
    super(id, points);
    this.cells = cells;
    this.name = `Set ${id}`;
  }
}

let kmap = new KarnaughMap();

let EXERCISES = [
  new ExKmapToExpr(1, 1, kmap.mapToCells(kmap.evaluate('D'))),
  new ExKmapToExpr(2, 2, kmap.mapToCells(kmap.evaluate('A and C'))),
  new ExKmapToExpr(3, 3, kmap.mapToCells(kmap.evaluate('(A and C) or (B and not C)'))),
  new ExKmapToExpr(4, 3, kmap.mapToCells(kmap.evaluate('(A and B and D) or (not A and not C)'))),
  new ExKmapToExpr(5, 4, [0, 4, 2, 6, 5, 7, 13, 15])
];

@Injectable()
export class ExKmapToExprService extends ExerciseService {

  constructor() {
    super(ExericseID.KMAP_TO_EXPR, 'Karnaugh Map to Expression', 'kmap-to-expr', EXERCISES);
  }

}
