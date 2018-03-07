import {ExpressionGroup} from './expression-group';
import {KarnaughMap} from './karnaugh-map';
import {BestGroupsSolver} from './best-groups-solver';

export class UserGroupingAnswer {
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
    this.selectedAsExpression = BestGroupsSolver.findBestGroups(selectedGroupsAsMaps)[0];
    this.answeredAsExpression = new ExpressionGroup(null, null, null, null);
    this.validGroup = this.selectedAsExpression.length == 1;
    this.varsComparison = new ExpressionGroup(null, null, null, null);
    this.correct = null;
    this.match = null;
  }

  clearComparison() {
    this.varsComparison = new ExpressionGroup(null, null, null, null);
    this.correct = null;
    this.match = null;
  }
}
