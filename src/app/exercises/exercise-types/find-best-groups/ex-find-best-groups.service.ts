import {Injectable} from '@angular/core';
import {Exercise} from '../../exercise';
import {ExerciseService, ExericseID} from '../../exercise.service';

export class ExFindBestGroups extends Exercise {
  static currentPracticeID = 1;
  static currentQuizID = 1;

  constructor(cells: number[], nVars = 4, points: number, isQuiz = false) {
    let id: number;
    if (isQuiz) {
      id = ExFindBestGroups.currentQuizID;
      ExFindBestGroups.currentQuizID++;
    } else {
      id = ExFindBestGroups.currentPracticeID;
      ExFindBestGroups.currentPracticeID++;
    }

    super(id, points);
    this.nVars = (nVars == 3) ? 3 : 4;
    this.cells = cells.filter(cell => cell < Math.pow(2, this.nVars));
    this.name = `Set ${id}`;
  }
}

let EXERCISES_TEST = [
  new ExFindBestGroups([0, 4, 2, 6], 3, 2, true),
  new ExFindBestGroups([0, 4, 5, 7, 3, 2], 3, 2, true),
  new ExFindBestGroups([0, 1, 4, 5, 15, 14, 11, 10], 4, 2, true),
  new ExFindBestGroups([1, 2, 3, 4], 4, 3, true),
  new ExFindBestGroups([0, 4, 5, 12, 6], 4, 3, true),
  new ExFindBestGroups([7, 6, 15, 14, 12, 13, 8, 9], 4, 3, true),
  new ExFindBestGroups([3, 2, 7, 6, 12, 13, 15, 8, 9, 11], 4, 4, true),
  new ExFindBestGroups([1, 3, 2, 5, 7, 12, 13, 15, 8, 9], 4, 5, true),
  new ExFindBestGroups([0, 1, 3, 2, 5, 7, 6, 12, 13, 15, 14, 8, 9], 5, 5, true),
  new ExFindBestGroups([0, 1, 3, 4, 5, 12, 15, 14, 9, 10], 4, 5, true)
];

let EXERCISES_PRACTICE = [
  new ExFindBestGroups([0, 4, 2, 6], 3, null),
  new ExFindBestGroups([0, 2, 5, 7], 3, null),
  new ExFindBestGroups([1, 2, 3, 5], 4, null),
  new ExFindBestGroups([0, 4, 8, 6, 14, 10], 4, null),
  new ExFindBestGroups([4, 5, 7, 6, 12, 14], 4, null),
  new ExFindBestGroups([0, 1, 4, 5, 3, 14, 11, 10], 4, null),
  new ExFindBestGroups([7, 6, 15, 14, 12], 4, null),
  new ExFindBestGroups([2, 7, 6, 13, 15, 14, 8, 9, 11, 10], 4, null),
  new ExFindBestGroups([0, 1, 3, 2, 4, 12, 8, 9, 11, 10, 14, 6], 4, null),
  new ExFindBestGroups([0, 4, 2, 6, 5, 7, 13, 8, 9, 11, 10], 4, null)
];

// @Injectable()
export class ExFindBestGroupsService extends ExerciseService {

  constructor() {
    super(ExericseID.FIND_BEST, 'Find the Best Groups', 'find-groups', EXERCISES_TEST, EXERCISES_PRACTICE);
  }

}
