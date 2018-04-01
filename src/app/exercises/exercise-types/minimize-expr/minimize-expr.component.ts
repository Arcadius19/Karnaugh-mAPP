import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../auxiliary/interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExMinimizeExpr, MinimizeExprService} from './minimize-expr.service';
import {Observable} from 'rxjs/Observable';
import {MathJaxConverter} from '../../../auxiliary/mathjax-aux/math-jax-converter';
import {UserGroupingAnswer} from '../../../auxiliary/user-grouping-answer';
import {ExpressionGroup} from '../../../auxiliary/expression-group';
import {BestGroupsSolver} from '../../../auxiliary/best-groups-solver';

@Component({
  selector: 'app-minimize-expr',
  template: ''
})
export class MinimizeExprComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  interKmapComponent: InteractiveKmapComponent;

  routePath = '/';

  exercise$: Observable<ExMinimizeExpr>;
  id: number;
  latexExpression: string;

  solutionMarked: number[][];
  dnfSolutionBestGroupsExpressions: ExpressionGroup[][];        // all possible DNF solutions as Expressions,
  dnfSolutionBestGroupsCells: number[][][];

  cnfSolutionBestGroupsExpressions: ExpressionGroup[][];        // all possible CNF solutions as Expressions,
  cnfSolutionBestGroupsCells: number[][][];

  noOfPossibleSolutions: number;

  dnfForm = true;
  nVars = 4;    // may be changed dynamically

  nGuessed: number;
  nTrue: number;
  nTrueCorrect: number;
  nTrueIncorrect: number;

  correctSelected: boolean;

  userGroupingAnswers: UserGroupingAnswer[];
  foundBestGroups: boolean;
  finalCorrect: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: MinimizeExprService
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
        this.interKmapComponent.nVars = this.nVars;
        this.interKmapComponent.ngOnInit();
      }
      this.populateProperties(exercise);
      this.resetComponent();
    });
  }

  getQuestion(params) {
    return this.service.getExercisePracticeAsync(params.get('id'));
  }

  populateProperties(exercise: ExMinimizeExpr) {
    this.id = exercise.id;
    this.latexExpression = MathJaxConverter.toMathJax(exercise.expression);
    this.solutionMarked = this.interKmapComponent.kmap.evaluate(exercise.expression);

    this.dnfSolutionBestGroupsExpressions = BestGroupsSolver.findBestGroups(this.solutionMarked);
    this.dnfSolutionBestGroupsCells = this.dnfSolutionBestGroupsExpressions
      .map(groupOfGroups => groupOfGroups
        .map(group => this.interKmapComponent.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2)));

    this.cnfSolutionBestGroupsExpressions = BestGroupsSolver.findBestGroups(this.solutionMarked.map(row => row.map(cell => 1 - cell)));
    this.cnfSolutionBestGroupsCells = this.cnfSolutionBestGroupsExpressions
      .map(groupOfGroups => groupOfGroups
        .map(group => this.interKmapComponent.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2)));
  }

  resetComponent() {
    this.noOfPossibleSolutions = null;
    this.correctSelected = null;
    this.interKmapComponent.ngOnInit();
    this.resetGrouping();
  }

  resetGrouping() {
    this.userGroupingAnswers = [];
    this.foundBestGroups = null;
    this.finalCorrect = null;
    this.interKmapComponent.active = true;
    this.interKmapComponent.selectedGroups = [];
  }

  onVerifySelected() {
    this.nGuessed = 0;
    this.nTrue = 0;
    this.nTrueCorrect = 0;
    this.nTrueIncorrect = 0;

    let result = true;
    let solutionMarked: number[][];

    if (this.dnfForm) {
      solutionMarked = this.solutionMarked;
    } else {
      // reverse values
      solutionMarked = this.solutionMarked.map(row => row.map(cell => 1 - cell));
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
      this.correctSelected = true;
      this.selectedCorrectly();
    } else {
      this.correctSelected = false;
    }
  }

  selectedCorrectly() {
    this.interKmapComponent.partiallyActive = true;
    this.interKmapComponent.premarked = this.interKmapComponent.marked;
    this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0));
  }

  onGroup(validateGroup = true) {
    let successGroup = this.interKmapComponent.onGroup(validateGroup);
    this.interKmapComponent.checkForResolution();
    if (successGroup) {
      this.userGroupingAnswers.push(new UserGroupingAnswer(successGroup));
    }
  }

  removeAnswerGroup(index: number) {
    this.interKmapComponent.removeAnswerGroup(index);
    this.userGroupingAnswers.splice(index, 1);
  }

  onVerifyGrouping() {
    let groupsMatchedCorrectly = false;
    let groupsMatchedAndLabelledCorrectly = false;

    let bestGroupsCells = (this.dnfForm) ? this.dnfSolutionBestGroupsCells : this.cnfSolutionBestGroupsCells;

    this.noOfPossibleSolutions = (this.dnfForm) ? this.dnfSolutionBestGroupsCells.length : this.cnfSolutionBestGroupsCells.length;

    for (let index = 0; index < bestGroupsCells.length; index++) {
      let nMatches = 0;
      let nCorrectAndMatch = 0;

      for (let answer of this.userGroupingAnswers) {
        if (answer.validGroup) {
          answer.varsComparison = answer.selectedAsExpression[0].compareVariables(answer.answeredAsExpression);
        }
        answer.correct = answer.varsComparison.equals(new ExpressionGroup(true, true, true, true));
        answer.match = bestGroupsCells[index].some(group => group.every((cell, i) => cell == answer.selectedAsCells[i]));
        if (answer.match) {
          nMatches++;
          if (answer.correct) {
            nCorrectAndMatch++;
          }
        }
      }
      groupsMatchedCorrectly =
        nMatches == this.userGroupingAnswers.length && this.userGroupingAnswers.length == bestGroupsCells[index].length;
      groupsMatchedAndLabelledCorrectly =
        nCorrectAndMatch == this.userGroupingAnswers.length && this.userGroupingAnswers.length == bestGroupsCells[index].length;

      if (groupsMatchedCorrectly) { break; }
    }

    this.foundBestGroups = groupsMatchedCorrectly;
    this.finalCorrect = groupsMatchedAndLabelledCorrectly;

  }

  userMinimalExpressionInMathjax(): string {
    if (this.userGroupingAnswers.length > 0) {
      return ExpressionGroup.toComplexExpressionMathJax(this.userGroupingAnswers.map(answer => answer.answeredAsExpression), this.dnfForm);
    } else {
      return MathJaxConverter.toMathJax('0');
    }
  }

  clearFeedback() {
    this.finalCorrect = null;
    this.foundBestGroups = null;
    this.userGroupingAnswers.forEach(answer => answer.clearComparison());
  }

}
