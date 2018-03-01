import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ExNameGroup, ExNameGroupService} from './ex-name-group.service';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {MathJax} from '../../../auxiliary/mathjax-aux/math-jax';

@Component({
  selector: 'app-ex-name-group',
  template: ''
})
export class NameGroupComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExNameGroup>;
  id: number;
  points: number;

  kmap = new KarnaughMap(4); // auxiliary kmap

  variables = [
    {name: 'A', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'B', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'C', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'D', formAnswer: null, answer: null, solution: null, result: null}
  ];
  correct = null;
  latexUserExpression = null;
  latexSolutionExpression = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExNameGroupService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExerciseTestAsync(params.get('id')));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate(['/exercises']);
      } else {
        if (this.interKmapComponent) {
          this.interKmapComponent.premarkedCells = this.kmap.markExpression(exercise.expressionGroup);
          this.interKmapComponent.ngOnInit();
        }

        this.id = exercise.id;
        this.points = exercise.points;

        this.variables[0].solution = exercise.expressionGroup.aVar;
        this.variables[1].solution = exercise.expressionGroup.bVar;
        this.variables[2].solution = exercise.expressionGroup.cVar;
        this.variables[3].solution = exercise.expressionGroup.dVar;

        let latexSolutionExpression = '';
        for (let variable of this.variables) {
          if (variable.solution == true) {
            latexSolutionExpression += ' and ' + variable.name;
          }
          if (variable.solution == false) {
            latexSolutionExpression += ' and not ' + variable.name;
          }
        }
        if (latexSolutionExpression == '') {
          latexSolutionExpression = '1';
        } else {
          latexSolutionExpression = latexSolutionExpression.slice(5);
        }
        this.latexSolutionExpression = MathJax.toMathJax(latexSolutionExpression);

        this.resetComponent();
      }
    });
  }

  resetComponent() {
    this.variables.map(variable => { variable.formAnswer = null; variable.answer = null; variable.result = null; });
    this.correct = null;
    this.latexUserExpression = null;
  }

  onVerify() {
    let result = true;
    let latexExpression = '';

    for (let variable of this.variables) {
      if (variable.formAnswer == 'true') {
        variable.answer = true;
        latexExpression += ' and ' + variable.name;
      } else if (variable.formAnswer == 'false') {
        variable.answer = false;
        latexExpression += ' and not ' + variable.name;
      } else {
        variable.answer = null;
      }

      if (variable.answer == variable.solution) {
        variable.result = true;
      } else {
        variable.result = false;
        result = false;
      }
    }

    this.correct = result;

    if (this.correct == true) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }

    if (latexExpression == '') {
      latexExpression = '1';
    } else {
      latexExpression = latexExpression.slice(5);
    }

    this.latexUserExpression = MathJax.toMathJax(latexExpression);
  }

}
