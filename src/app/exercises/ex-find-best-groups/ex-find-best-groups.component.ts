import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExFindBestGroups, ExFindBestGroupsService} from './ex-find-best-groups.service';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../karnaugh-map';
import {BestGroupsSolver} from '../../best-groups-solver';

@Component({
  selector: 'app-ex-find-best-groups',
  templateUrl: './ex-find-best-groups.component.html',
  styleUrls: ['./ex-find-best-groups.component.css']
})
export class ExFindBestGroupsComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExFindBestGroups>;
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
        this.service.getExerciseAsync(params.get('id')));

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
        this.kmap = new KarnaughMap(exercise.nVars);
        this.solution = BestGroupsSolver
          .findBestGroupsAsGrid(this.kmap.cellsToMap(exercise.cells))
          .map(group => group.toCells(exercise.nVars).sort((n1, n2) => n1 - n2));
        this.resetComponent();
      }
    });
  }

  resetComponent() {
    this.correct = null;
  }

  onVerify() {
    let found = 0;
    loopSelectedGroups:
      for (let selectedGroup of this.interKmapComponent.selectedGroups) {
      loopSolutionGroups:
        for (let solutionGroup of this.solution) {
          for (let i in selectedGroup) {
            if (selectedGroup[i] != solutionGroup[i]) {
              continue loopSolutionGroups;
            }
          }
          found++;
          continue loopSelectedGroups;
        }
      }

    this.correct = (found == this.solution.length && found == this.interKmapComponent.selectedGroups.length);
  }

}
