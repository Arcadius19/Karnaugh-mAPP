import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExKmapToExpr, ExKmapToExprService} from './ex-kmap-to-expr.service';
import {KarnaughMap} from '../../karnaugh-map';
import {BestGroupsSolver} from '../../best-groups-solver';
import {ExpressionGroup} from '../../expression-group';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './ex-kmap-to-expr.component.html',
  styleUrls: ['./ex-kmap-to-expr.component.css']
})
export class ExKmapToExprComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExKmapToExpr>;
  id: number;
  points: number;

  kmap = new KarnaughMap();                          // By default, always with 4 variables

  bestGroupsExpressions: ExpressionGroup[];          // solution as Expressions, e.g. G1: {aVar: True; bVar: null; cVar: False; dVar: null}
  bestGroupsCells: number[][];                       // solution as arrays of cells in each group, e.g. G1: [8, 9, 12, 13]

  userAnswers: UserAnswer[];
  finalCorrect: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExKmapToExprService
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
      if (this.interKmapComponent) {
        this.interKmapComponent.premarkedCells = exercise.cells;
        this.interKmapComponent.ngOnInit();
      }
      this.id = exercise.id;
      this.points = exercise.points;

      this.bestGroupsExpressions = BestGroupsSolver.findBestGroups(this.kmap.cellsToMap(exercise.cells));
      this.bestGroupsCells = this.bestGroupsExpressions
        .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2));

      this.resetComponent();
    });
  }

  resetComponent() {
    this.userAnswers = [];
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

    this.finalCorrect = nCorrectAndMatch == this.userAnswers.length && this.userAnswers.length == this.bestGroupsCells.length;

    if (this.finalCorrect == true) {
      this.service.addPointsToTotal(this.id, this.points);
    }
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
