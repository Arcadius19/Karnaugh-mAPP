import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../auxiliary/interactive-kmap/interactive-kmap.component';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExKmapToExpr, ExKmapToExprService} from './ex-kmap-to-expr.service';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {BestGroupsSolver} from '../../../auxiliary/best-groups-solver';
import {ExpressionGroup} from '../../../auxiliary/expression-group';
import {UserGroupingAnswer} from '../../../auxiliary/user-grouping-answer';
import {MathJax} from '../../../auxiliary/mathjax-aux/math-jax';

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

  kmap = new KarnaughMap();                          // By default, always with 4 variables

  bestGroupsExpressions: ExpressionGroup[][];        // all possible solutions as Expressions,
                                                     // e.g. G1: {aVar: True, bVar: null, cVar: False, dVar: null}
  bestGroupsCells: number[][][];                     // all possible solutions as arrays of cells in each group, e.g. G1: [8, 9, 12, 13]

  userAnswers: UserGroupingAnswer[];
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
      if (!this.interKmapComponent) {
        this.interKmapComponent = new InteractiveKmapComponent();
      }
      this.interKmapComponent.premarkedCells = exercise.cells;
      this.interKmapComponent.ngOnInit();

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
      .map(groupOfGroups => groupOfGroups
        .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2)));
  }

  resetComponent() {
    this.userAnswers = [];
    this.foundBestGroups = null;
    this.finalCorrect = null;
    this.interKmapComponent.active = true;
    this.interKmapComponent.selectedGroups = [];
  }

  onGroup() {
    let successGroup = this.interKmapComponent.onGroup(true);
    if (successGroup) {
      this.userAnswers.push(new UserGroupingAnswer(successGroup));
    }
    this.interKmapComponent.checkForResolution();
  }

  removeAnswerGroup(index: number) {
    this.interKmapComponent.removeAnswerGroup(index);
    this.userAnswers.splice(index, 1);
  }

  onVerify() {
    let nMatches = 0;
    let nCorrectAndMatch = 0;

    let groupsMatchedCorrectly = false;
    let groupsMatchedAndLabelledCorrectly = false;

    for (let index = 0; index < this.bestGroupsCells.length; index++) {
      for (let answer of this.userAnswers) {
        if (answer.validGroup) {
          answer.varsComparison = answer.selectedAsExpression[0].compareVariables(answer.answeredAsExpression);
        }
        answer.correct = answer.varsComparison.equals(new ExpressionGroup(true, true, true, true));
        answer.match = this.bestGroupsCells[index].some(group => group.every((cell, i) => cell == answer.selectedAsCells[i]));
        if (answer.match) {
          nMatches++;
          if (answer.correct) {
            nCorrectAndMatch++;
          }
        }
      }
      groupsMatchedCorrectly = nMatches == this.userAnswers.length && this.userAnswers.length == this.bestGroupsCells[index].length;
      groupsMatchedAndLabelledCorrectly =
        nCorrectAndMatch == this.userAnswers.length && this.userAnswers.length == this.bestGroupsCells[index].length;

      if (groupsMatchedCorrectly) { break; }
    }

    this.foundBestGroups = groupsMatchedCorrectly;
    this.finalCorrect = groupsMatchedAndLabelledCorrectly;

    if (this.foundBestGroups) {
      this.interKmapComponent.active = false;
    }

  }

  userMinimalExpressionInMathjax(): string {
    if (this.userAnswers.length == 0) {
      return MathJax.toMathJax('0');
    } else {
      return ExpressionGroup.toComplexExpressionMathJax(this.userAnswers.map(answer => answer.answeredAsExpression));
    }
  }

  clearFeedback() {
    this.finalCorrect = null;
    this.foundBestGroups = null;
    this.userAnswers.forEach(answer => answer.clearComparison());
  }

}
