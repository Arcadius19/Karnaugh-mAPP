import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomParser} from '../auxiliary/custom-parser';
import {MathJax} from '../auxiliary/mathjax-aux/math-jax';
import {InteractiveKmapComponent} from '../interactive-kmap/interactive-kmap.component';
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
    console.log('Submitted value:', form);
    this.query = form.query;
    let evaluations = this.interKmapComponent.kmap.evaluate(this.query);
    this.interKmapComponent.marked = evaluations;

    this.dnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, true);
    this.cnfGroupsExpressions = BestGroupsSolver.findBestGroups(evaluations, false);
    console.log('DNF groups: ', this.dnfGroupsExpressions);
    console.log('CNF groups: ', this.cnfGroupsExpressions);
  }

  queryToMathJax() {
    return MathJax.toMathJax(this.query);
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
