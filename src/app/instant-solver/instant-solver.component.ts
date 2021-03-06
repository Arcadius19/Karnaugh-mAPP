import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomParser} from '../auxiliary/custom-parser';
import {MathJaxConverter} from '../auxiliary/mathjax-aux/math-jax-converter';
import {InteractiveKmapComponent} from '../auxiliary/interactive-kmap/interactive-kmap.component';
import {BestGroupsSolver} from '../auxiliary/best-groups-solver';
import {ExpressionGroup} from '../auxiliary/expression-group';

@Component({
  selector: 'app-instant-solver',
  templateUrl: './instant-solver.component.html',
  styleUrls: ['./instant-solver.component.css']
})
export class InstantSolverComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  interKmapComponent: InteractiveKmapComponent;

  tooltipInfoClicked = false;
  tooltipText: string;

  form: FormGroup;
  query = '';

  nVars = 4;
  dnfTypeOption = true;

  dnfGroupsExpressions: ExpressionGroup[][];
  cnfGroupsExpressions: ExpressionGroup[][];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      'query': ['', [Validators.required, this.queryValidator.bind(this)]]
    });
  }

  ngOnInit() {
    this.query = '';
    this.tooltipText = 'Use<br>' +
                       'capital letters for variables (A,B,C,D) <br>' +
                       '"not" for &not; <br>' +
                       '"and" for &and; <br>' +
                       '"or" for &or; <br>' +
                       '"=>" for &rArr; <br>' +
                       '"<=>" or "iff" for &hArr; <br>' +
                       '"1" for &#8868; <br>' +
                       '"0" for &perp; <br>' +
                       '?: (conditional operator) is also allowed <br>' +
                       'Spaces between variables and operators are required';

  }

  queryValidator(control: FormControl): { [s: string]: boolean} {
    let query_string = control.value;
    const parser = CustomParser.PARSER;
    try {
      query_string = CustomParser.preParse(query_string);
      parser.parse(query_string);
      return null;
    } catch (err) {
      return {'invalidQuery': true};
    }
  }

  onSubmit(form: any): void {
    this.query = form.query;
    let evaluations = this.interKmapComponent.kmap.evaluate(this.query);
    this.interKmapComponent.marked = evaluations;

    this.dnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, true);
    this.cnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, false);
  }

  queryToMathJax() {
    return MathJaxConverter.toMathJax(this.query);
  }

  onVarsChange() {
    this.interKmapComponent.nVars = this.nVars;
    this.interKmapComponent.ngOnInit();
    this.interKmapComponent.marked = this.interKmapComponent.kmap.evaluate(this.query);
  }

  onSolve() {
    this.form.reset();
    this.query = '-';
    let evaluations = this.interKmapComponent.marked;

    this.dnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, true);
    this.cnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, false);
  }

  toFinalMathJaxSolution(groups: ExpressionGroup[]): string {
    return ExpressionGroup.toComplexExpressionMathJax(groups, this.dnfTypeOption);
  }

}
