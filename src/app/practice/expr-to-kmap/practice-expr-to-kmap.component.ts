import { Component, OnInit } from '@angular/core';
import {ExprToKmapComponent} from '../../exercises/exercise-types/expr-to-kmap/expr-to-kmap.component';

@Component({
  selector: 'app-practice-expr-to-kmap',
  templateUrl: './practice-expr-to-kmap.component.html',
  styleUrls: ['./practice-expr-to-kmap.component.css']
})
export class PracticeExprToKmapComponent extends ExprToKmapComponent implements OnInit {
  routePath = '/practice';

  nGuessed: number;           // number of states user marked correctly
  nTrue: number;              // number of states user should mark (all true/false states)
  nTrueCorrect: number;       // number of true/false states user marked
  nTrueIncorrect: number;     // number of non-true/false states user marked but should not

  showAnswer = false;

  resetComponent() {
    super.resetComponent();
    this.interKmapComponent.premarked = this.interKmapComponent.premarked.map(row => row.map(cell => 0));
    this.nGuessed = 0;
    this.nTrue = 0;
    this.nTrueCorrect = 0;
    this.nTrueIncorrect = 0;
    this.showAnswer = false;
  }

  onVerify() {
    this.nGuessed = 0;
    this.nTrue = 0;
    this.nTrueCorrect = 0;
    this.nTrueIncorrect = 0;

    let result = true;

    for (let i in this.interKmapComponent.marked) {
      for (let j in this.solution) {
        if (this.solution[i][j] == 1) { this.nTrue++; }
        if (this.interKmapComponent.marked[i][j] == this.solution[i][j]) {
          this.nGuessed++;
          if (this.solution[i][j] == 1) { this.nTrueCorrect++; }
        } else {
          result = false;
          if (this.solution[i][j] == 0) { this.nTrueIncorrect++; }
        }
      }
    }

    if (result) {
      this.correct = true;
      this.interKmapComponent.active = false;
    } else {
      this.correct = false;
    }
  }

  onShowSolution() {
    this.resetComponent();
    this.showAnswer = true;
    this.interKmapComponent.active = false;
    this.interKmapComponent.premarked = this.solution;
    this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0));
  }

}
