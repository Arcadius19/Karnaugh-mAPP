import { Component, OnInit } from '@angular/core';
import {ExprToKmapComponent} from '../../exercises/exercise-types/expr-to-kmap/expr-to-kmap.component';

@Component({
  selector: 'app-practice-expr-to-kmap',
  templateUrl: './practice-expr-to-kmap.component.html',
  styleUrls: ['./practice-expr-to-kmap.component.css']
})
export class PracticeExprToKmapComponent extends ExprToKmapComponent implements OnInit {
  nGuessed: number;           // number of states user marked correctly
  nTrue: number;              // number of states user should mark (all true/false states)
  nTrueCorrect: number;       // number of true/false states user marked
  nTrueIncorrect: number;     // number of non-true/false states user marked but should not
  routePath = '/practice';

  resetComponent() {
    super.resetComponent();
    this.nGuessed = 0;
    this.nTrue = 0;
    this.nTrueCorrect = 0;
    this.nTrueIncorrect = 0;
  }

  onVerify() {
    this.nGuessed = 0;
    this.nTrue = 0;
    this.nTrueCorrect = 0;
    this.nTrueIncorrect = 0;

    let result = true;
    let solutionMarked: number[][];

    if (this.markTrue) {
      solutionMarked = this.solution;
    } else {
      // reverse values
      solutionMarked = this.solution.map(row => row.map(cell => 1 - cell));
    }

    for (let i in this.interKmapComponent.marked) {
      for (let j in solutionMarked) {
        if (solutionMarked[i][j] == 1) { this.nTrue++; }
        if (this.interKmapComponent.marked[i][j] == solutionMarked[i][j]) {
          this.nGuessed++;
          if (solutionMarked[i][j] == 1) { this.nTrueCorrect++; }
        } else {
          result = false;
          if (solutionMarked[i][j] == 0) { this.nTrueIncorrect++; }
        }
      }
    }

    if (result) {
      this.correct = true;
    } else {
      this.correct = false;
    }
  }

}
