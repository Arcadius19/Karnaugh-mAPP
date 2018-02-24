import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../../mathjax-aux/math-jax';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {KarnaughMap} from '../../karnaugh-map';

@Component({
  selector: 'app-ex-expr-to-kmap',
  templateUrl: './ex-expr-to-kmap.component.html',
  styleUrls: ['./ex-expr-to-kmap.component.css']
})
export class ExExprToKmapComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExExprToKmap>;
  id: number;
  markTrue: boolean;          // whether user should select true or false states
  nVars = 4;                  // may be changed to dynamic in future
  latexExpression: string;    // expression in LaTeX form
  solution: number[][];       // KMap grid with correct formAnswer
  correct: boolean;           // whether user's formAnswer was correct or not
  resultStyle: string;        // style for panels (panel-success or panel-danger) depending on 'correct' boolean
  nGuessed: number;           // number of states user marked correctly
  nTrue: number;              // number of states user should mark (all true/false states)
  nTrueCorrect: number;       // number of true/false states user marked
  nTrueIncorrect: number;     // number of non-true/false states user marked but should not

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExExprToKmapService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExerciseAsync(params.get('id')));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate(['/exercises']);
        return;
      }

      this.markTrue = Math.random() > 0.5;
      this.latexExpression = MathJax.toMathJax(exercise.expression);
      this.solution = (new KarnaughMap(this.nVars)).evaluate(exercise.expression);
      this.resetComponent();
    });
  }

  resetComponent() {
    if (this.interKmapComponent) {
      this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0)); // reset marked
    }
    this.correct = null;
    this.resultStyle = null;
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
      this.resultStyle = 'panel-success';
    } else {
      this.correct = false;
      this.resultStyle = 'panel-danger';
    }
  }

  onTryAgain() {
    this.resetComponent();
  }

  onShowSolution() {
    console.log(this.solution);
  }

}
