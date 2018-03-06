import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../../../auxiliary/mathjax-aux/math-jax';
import {InteractiveKmapComponent} from '../../../auxiliary/interactive-kmap/interactive-kmap.component';
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
      this.markTrue = Math.random() > 0.5;
      if (!this.interKmapComponent) {
        this.interKmapComponent = new InteractiveKmapComponent();
        this.interKmapComponent.nVars = this.nVars;
        this.interKmapComponent.positiveMarking = this.markTrue;
        this.interKmapComponent.ngOnInit();
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
    this.latexExpression = MathJax.toMathJax(exercise.expression);
    let evaluations = this.interKmapComponent.kmap.evaluate(exercise.expression);
    this.solution = (this.markTrue) ? evaluations : evaluations.map(row => row.map(cell => 1 - cell));
  }

  resetComponent() {
    this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0)); // reset marked
    this.interKmapComponent.active = true;
    this.correct = null;
  }

  onVerify() { }

}
