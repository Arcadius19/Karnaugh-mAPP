import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ExNameGroup, ExNameGroupService} from './ex-name-group.service';

@Component({
  selector: 'app-ex-name-group',
  templateUrl: './ex-name-group.component.html',
  styleUrls: ['./ex-name-group.component.css']
})
export class ExNameGroupComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExNameGroup>;

  variables = [
    {name: 'A', answer: null, solution: null},
    {name: 'B', answer: null, solution: null},
    {name: 'C', answer: null, solution: null},
    {name: 'D', answer: null, solution: null}
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
          this.interKmapComponent.premarkedCells = exercise.cells;
          this.interKmapComponent.ngOnInit();
        }
      }
    });
  }

  onVerify() {
    for (let variable of this.variables) {
      if (variable.answer == 'true') {
        variable.answer = true;
      } else if (variable.answer == 'false') {
        variable.answer = false;
      } else {
        variable.answer = null;
      }
      console.log(variable.name + ': ' + variable.answer + ' (type: ' + typeof variable.answer + ')');
    }
  }

}
