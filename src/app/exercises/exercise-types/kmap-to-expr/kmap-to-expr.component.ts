import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../interactive-kmap/interactive-kmap.component';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExKmapToExpr, ExKmapToExprService} from './ex-kmap-to-expr.service';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {BestGroupsSolver} from '../../../auxiliary/best-groups-solver';
import {ExpressionGroup} from '../../../auxiliary/expression-group';

@Component({
  selector: 'app-ex-kmap-to-expr',
  template: ''
})
export class KmapToExprComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  interKmapComponent: InteractiveKmapComponent;

  routePath = '/';

  exercise$: Observable<ExKmapToExpr>;
  id: number;
  points: number;

  kmap = new KarnaughMap();                          // By default, always with 4 variables

  bestGroupsExpressions: ExpressionGroup[];          // solution as Expressions, e.g. G1: {aVar: True; bVar: null; cVar: False; dVar: null}
  bestGroupsCells: number[][];                       // solution as arrays of cells in each group, e.g. G1: [8, 9, 12, 13]

  userAnswers: UserAnswer[];
  foundBestGroups: boolean;
  finalCorrect: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ExKmapToExprService
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
      if (this.interKmapComponent) {
        this.interKmapComponent.premarkedCells = exercise.cells;
        this.interKmapComponent.ngOnInit();
      }
      this.populateParameters(exercise);
      this.resetComponent();
    });
  }

  getQuestion(params) {
    return this.service.getExercisePracticeAsync(params.get('id'));
  }

  populateParameters(exercise: ExKmapToExpr) {
    this.id = exercise.id;

    this.bestGroupsExpressions = BestGroupsSolver.findBestGroups(this.kmap.cellsToMap(exercise.cells));
    this.bestGroupsCells = this.bestGroupsExpressions
      .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2));
  }

  resetComponent() {
    this.userAnswers = [];
    this.foundBestGroups = null;
    this.finalCorrect = null;
  }

  onGroup() {
    let successGroup = this.interKmapComponent.onGroup();
    if (successGroup) {
      this.userAnswers.push(new UserAnswer(successGroup));
    }

  }

  removeAnswerGroup(index: number) {
    this.interKmapComponent.removeAnswerGroup(index);
    this.userAnswers.splice(index, 1);
  }

  onVerify() {
    let nMatches = 0;
    let nCorrectAndMatch = 0;

    for (let answer of this.userAnswers) {
      if (answer.validGroup) {
        answer.varsComparison = answer.selectedAsExpression[0].compareVariables(answer.answeredAsExpression);
      }
      answer.correct = answer.varsComparison.equals(new ExpressionGroup(true, true, true, true));
      answer.match = this.bestGroupsCells.some(group => group.every((cell, index) => cell == answer.selectedAsCells[index]));
      if (answer.match) {
        nMatches++;
        if (answer.correct) {
          nCorrectAndMatch++;
        }
      }
    }

    this.foundBestGroups = nMatches == this.userAnswers.length && this.userAnswers.length == this.bestGroupsCells.length;
    this.finalCorrect = nCorrectAndMatch == this.userAnswers.length && this.userAnswers.length == this.bestGroupsCells.length;

  }

  userMinimalExpressionInMathjax(): string {
    return ExpressionGroup.toComplexExpressionMathJax(this.userAnswers.map(answer => answer.answeredAsExpression));
  }

}

export class UserAnswer {
  selectedAsCells: number[];
  selectedAsExpression: ExpressionGroup[];
  validGroup: boolean;
  answeredAsExpression: ExpressionGroup;
  varsComparison: ExpressionGroup;
  correct: boolean;         // selectedAsExpression.equals(answeredAsExpression)
  match: boolean;           // there is such a group in final solution

  constructor(selectedAsCells: number[]) {
    this.selectedAsCells = selectedAsCells;
    let selectedGroupsAsMaps = (new KarnaughMap()).cellsToMap(this.selectedAsCells);
    this.selectedAsExpression = BestGroupsSolver.findBestGroups(selectedGroupsAsMaps);
    this.answeredAsExpression = new ExpressionGroup(null, null, null, null);
    this.validGroup = this.selectedAsExpression.length == 1;
    this.varsComparison = new ExpressionGroup(null, null, null, null);
    this.correct = null;
    this.match = null;
  }
}
