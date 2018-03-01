import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExFindBestGroups, ExFindBestGroupsService} from './ex-find-best-groups.service';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';
import {BestGroupsSolver} from '../../../auxiliary/best-groups-solver';

@Component({
  selector: 'app-find-best-groups',
  template: ''
})
export class FindBestGroupsComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExFindBestGroups>;
  id: number;
  points: number;

  kmap: KarnaughMap;            // auxiliary Karnaugh map used in some methods
  solution: number[][];
  correct: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExFindBestGroupsService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExerciseTestAsync(params.get('id')));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate(['/exercises']);
      } else {
        if (this.interKmapComponent) {
          this.interKmapComponent.nVars = exercise.nVars;
          this.interKmapComponent.premarkedCells = exercise.cells;
          this.interKmapComponent.ngOnInit();
        }
        this.id = exercise.id;
        this.points = exercise.points;
        this.kmap = new KarnaughMap(exercise.nVars);
        this.solution = BestGroupsSolver
          .findBestGroups(this.kmap.cellsToMap(exercise.cells))
          .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2));
        this.resetComponent();
      }
    });
  }

  resetComponent() {
    this.correct = null;
  }

  onVerify() {
    this.correct = this.interKmapComponent.compareSelectedToBest(this.solution);
    if (this.correct) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }
  }

}
