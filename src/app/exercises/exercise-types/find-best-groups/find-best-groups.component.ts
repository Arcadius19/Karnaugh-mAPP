import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../../auxiliary/interactive-kmap/interactive-kmap.component';
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
  interKmapComponent: InteractiveKmapComponent;

  routePath = '/';

  exercise$: Observable<ExFindBestGroups>;
  id: number;

  kmap: KarnaughMap;            // auxiliary Karnaugh map used in some methods
  solutions: number[][][];
  correct: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public service: ExFindBestGroupsService
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
      } else {
        if (this.interKmapComponent) {
          this.interKmapComponent.nVars = exercise.nVars;
          this.interKmapComponent.premarkedCells = exercise.cells;
          this.interKmapComponent.ngOnInit();
        }
        this.populateProperties(exercise);
        this.resetComponent();
      }
    });
  }

  getQuestion(params) {
    return this.service.getExercisePracticeAsync(params.get('id'));
  }

  populateProperties(exercise: ExFindBestGroups) {
    this.id = exercise.id;
    this.kmap = new KarnaughMap(exercise.nVars);
    this.solutions = BestGroupsSolver
      .findBestGroups(this.kmap.cellsToMap(exercise.cells))
      .map(groupOfGroups => groupOfGroups
        .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2)));
  }

  resetComponent() {
    this.correct = null;
  }

  onVerify() {
    this.correct = this.interKmapComponent.compareSelectedToBest(this.solutions);
  }

}
