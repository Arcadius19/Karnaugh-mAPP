import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../../../auxiliary/mathjax-aux/math-jax';
import {InteractiveKmapComponent} from '../../../interactive-kmap/interactive-kmap.component';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';

@Component({
  selector: 'app-expr-to-kmap',
  template: ''
})
export class ExprToKmapComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExExprToKmap>;
  id: number;

  routePath = '/';
  markTrue: boolean;          // whether user should select true or false states
  nVars = 4;                  // may be changed to dynamic in future
  latexExpression: string;    // expression in LaTeX form
  solution: number[][];       // KMap grid with correct formAnswer
  correct: boolean;           // whether user's formAnswer was correct or not

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ExExprToKmapService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.getQuestion(params));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate([this.routePath]);
        return;
      }

      this.populateProperties(exercise);
      this.resetComponent();
    });
  }

  getQuestion(params) {
    return this.service.getExercisePracticeAsync(params.get('id'));
  }

  populateProperties(exercise: ExExprToKmap) {
    this.id = exercise.id;
    this.markTrue = Math.random() > 0.5;
    this.latexExpression = MathJax.toMathJax(exercise.expression);
    this.solution = (new KarnaughMap(this.nVars)).evaluate(exercise.expression);
  }

  resetComponent() {
    if (this.interKmapComponent) {
      this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0)); // reset marked
    }
    this.correct = null;
  }

  onVerify() { }

  onTryAgain() {
    this.resetComponent();
  }

  onShowSolution() {
    console.log(this.solution);
  }

}
