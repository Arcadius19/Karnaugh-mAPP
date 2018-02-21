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
  markTrue: boolean;
  nVars = 4;  // may be changed to dynamic in future
  latexExpression: string;
  solution: number[][];
  correct: boolean;
  resultStyle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExExprToKmapService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExercise(params.get('id')));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate(['/exercises']);
        return; }

      this.markTrue = Math.random() > 0.5;
      this.latexExpression = MathJax.toMathJax(exercise.expression);
      if (this.interKmapComponent) {
        this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0)); // reset marked
      }
      this.solution = (new KarnaughMap(this.nVars)).evaluate(exercise.expression);
      this.correct = null;
      this.resultStyle = null;
    });
  }

  onVerify() {
    let result = true;
    let nGuessed = 0;
    let nTrue = 0;
    let nTrueCorrect = 0;
    let nTrueIncorrect = 0;
    let solutionMarked: number[][];

    if (this.markTrue) {
      solutionMarked = this.solution;
    } else {
      // reverse values
      solutionMarked = this.solution.map(row => row.map(cell => 1 - cell));
    }

    for (let i in this.interKmapComponent.marked) {
      for (let j in solutionMarked) {
        if (solutionMarked[i][j] == 1) { nTrue++; }
        if (this.interKmapComponent.marked[i][j] == solutionMarked[i][j]) {
          nGuessed++;
          if (solutionMarked[i][j] == 1) { nTrueCorrect++; }
        } else {
          result = false;
          if (solutionMarked[i][j] == 0) { nTrueIncorrect++; }
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

    console.log('=== ', result, ' ===');
    console.log('You have guessed: ', nGuessed, ' in total');
    console.log('You have marked ', nTrueCorrect, ' out of ', nTrue);
    console.log('You should have not marked ', nTrueIncorrect, ' squares');
  }

}
