import {Injectable} from '@angular/core';
import {Exercise} from '../exercise';
import {ExerciseService, ExericseID} from '../exercise.service';

export class ExFindBestGroups extends Exercise {

  constructor(id: number, points: number, cells: number[], nVars?: number) {
    super(id, points);
    this.nVars = (nVars == 3) ? 3 : 4;
    this.cells = cells.filter(cell => cell < Math.pow(2, this.nVars));
    this.name = `Set ${id}`;
  }
}

let EXERCISES = [
  new ExFindBestGroups(1, 1, [1, 2, 3, 4]),
  new ExFindBestGroups(2, 2, [0, 1, 4, 5, 15, 14, 11, 10]),
  new ExFindBestGroups(3, 2, [7, 6, 15, 14, 12, 13, 8, 9]),
  new ExFindBestGroups(4, 2, [0, 4, 2, 6], 3)
];

@Injectable()
export class ExFindBestGroupsService extends ExerciseService {

  constructor() {
    super(ExericseID.FIND_BEST, 'Find the Best Groups', 'find-groups', EXERCISES);
  }

}
