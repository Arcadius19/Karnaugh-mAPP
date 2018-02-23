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
  selectedGroups: number[][];
  correct: boolean;

  doubleSelected = false;
  emptySelected = false;

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
          .findBestGroups(this.kmap.cellsToMap(exercise.cells))
          .map(group => group.toCells(exercise.nVars).sort((n1, n2) => n1 - n2));
        this.resetComponent();
      }
    });
  }

  resetComponent() {
    this.selectedGroups = [];
    this.correct = null;
    this.doubleSelected = false;
    this.emptySelected = false;
  }

  onGroup() {
    let selectedCells = this.kmap.mapToCells(this.interKmapComponent.marked).sort((n1, n2) => n1 - n2);

    if (selectedCells.length == 0) {
      this.emptySelected = true;
      setTimeout(() => { this.emptySelected = false; }, 2000);
    } else if (!this.checkIfAlreadySelected(selectedCells)) {
      this.selectedGroups.push(selectedCells);
    } else {
      this.doubleSelected = true;
      setTimeout(() => { this.doubleSelected = false; }, 2000);
    }
    this.interKmapComponent.marked = this.interKmapComponent.marked.map(row => row.map(cell => 0));
  }

  checkIfAlreadySelected(selected: number[]): boolean {
    // selected and arrays in selectedGroups are sorted
    loopGroups:
      for (let group of this.selectedGroups) {
        if (selected.length == group.length) {
          for (let i in group) {
            if (selected[i] != group[i]) {
              continue loopGroups;
            }
          }
          return true;
        }
      }
    return false;
  }

  onVerify() {
    let found = 0;
    loopSelectedGroups:
      for (let selectedGroup of this.selectedGroups) {
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

    this.correct = (found == this.solution.length && found == this.selectedGroups.length);
  }

  removeAnswerGroup(index: number) {
    this.selectedGroups.splice(index, 1);
    this.unhoverGroup();
  }

  hoverGroup(index: number) {
    let group = this.selectedGroups[index];
    this.interKmapComponent.highlight =
      this.kmap.cellIds.map(row => row.map(cell => +group.includes(cell)));
  }

  unhoverGroup() {
    this.interKmapComponent.highlight =
      this.interKmapComponent.highlight.map(row => row.map(cell => 0));
  }

}
