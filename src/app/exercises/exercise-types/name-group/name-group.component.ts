import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../auxiliary/interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ExNameGroup, ExNameGroupService} from './ex-name-group.service';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {ExpressionGroup} from '../../../auxiliary/expression-group';

@Component({
  selector: 'app-ex-name-group',
  template: ''
})
export class NameGroupComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  interKmapComponent: InteractiveKmapComponent;

  routePath = '/';

  exercise$: Observable<ExNameGroup>;
  id: number;

  kmap = new KarnaughMap(4); // auxiliary kmap

  variables = [
    {name: 'A', answer: null, solution: null, result: null},
    {name: 'B', answer: null, solution: null, result: null},
    {name: 'C', answer: null, solution: null, result: null},
    {name: 'D', answer: null, solution: null, result: null}
  ];
  correct = null;
  latexUserExpression = null;
  latexSolutionExpression = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ExNameGroupService
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
      } else {
        if (!this.interKmapComponent) {
          this.interKmapComponent = new InteractiveKmapComponent();
        }
        this.interKmapComponent.premarkedCells = this.kmap.markExpression(exercise.expressionGroup);
        this.interKmapComponent.ngOnInit();

        this.populateParameters(exercise);
        this.resetComponent();
      }
    });
  }

  getQuestion(params) {
    return this.service.getExercisePracticeAsync(params.get('id'));
  }

  populateParameters(exercise: ExNameGroup) {
    this.id = exercise.id;

    this.variables[0].solution = exercise.expressionGroup.aVar;
    this.variables[1].solution = exercise.expressionGroup.bVar;
    this.variables[2].solution = exercise.expressionGroup.cVar;
    this.variables[3].solution = exercise.expressionGroup.dVar;

    this.latexSolutionExpression = exercise.expressionGroup.toMathJax();
  }

  resetComponent() {
    this.variables.map(variable => { variable.answer = null; variable.result = null; });
    this.correct = null;
    this.latexUserExpression = null;
  }

  onVerify() {
    let userAnswer = new ExpressionGroup(
      this.variables[0].answer, this.variables[1].answer, this.variables[2].answer, this.variables[3].answer);

    let solution = new ExpressionGroup(
      this.variables[0].solution, this.variables[1].solution, this.variables[2].solution, this.variables[3].solution);

    let varsComparison = userAnswer.compareVariables(solution);
    this.variables[0].result = varsComparison.aVar;
    this.variables[1].result = varsComparison.bVar;
    this.variables[2].result = varsComparison.cVar;
    this.variables[3].result = varsComparison.dVar;

    this.correct = userAnswer.equals(solution);
  }

  getLatexUserAnswer(dnfType = true): string {
    let userAnswer = new ExpressionGroup(
      this.variables[0].answer, this.variables[1].answer, this.variables[2].answer, this.variables[3].answer);

    return ExpressionGroup.toComplexExpressionMathJax([userAnswer], dnfType);
  }

}
