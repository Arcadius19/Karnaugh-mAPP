import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ExNameGroup, ExNameGroupService} from './ex-name-group.service';
import {KarnaughMap} from '../../karnaugh-map';

@Component({
  selector: 'app-ex-name-group',
  templateUrl: './ex-name-group.component.html',
  styleUrls: ['./ex-name-group.component.css']
})
export class ExNameGroupComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExNameGroup>;

  kmap = new KarnaughMap(4); // auxiliary kmap

  variables = [
    {name: 'A', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'B', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'C', formAnswer: null, answer: null, solution: null, result: null},
    {name: 'D', formAnswer: null, answer: null, solution: null, result: null}
  ];
  correct = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExNameGroupService
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
      } else {
        if (this.interKmapComponent) {
          this.interKmapComponent.premarkedCells = this.kmap.markExpression(exercise.expression);
          this.interKmapComponent.ngOnInit();
        }
        this.variables[0].solution = exercise.expression.aVar;
        this.variables[1].solution = exercise.expression.bVar;
        this.variables[2].solution = exercise.expression.cVar;
        this.variables[3].solution = exercise.expression.dVar;

        this.resetComponent();
      }
    });
  }

  resetComponent() {
    this.variables.map(variable => { variable.formAnswer = null; variable.answer = null; variable.result = null; });
    this.correct = null;
  }

  onVerify() {
    let result = true;

    for (let variable of this.variables) {
      if (variable.formAnswer == 'true') {
        variable.answer = true;
      } else if (variable.formAnswer == 'false') {
        variable.answer = false;
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
  }

}
