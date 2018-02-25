import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {Observable} from 'rxjs/Observable';
import {ExKmapToExpr, ExKmapToExprService} from './ex-kmap-to-expr.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {KarnaughMap} from '../../karnaugh-map';
import {BestGroupsSolver} from '../../best-groups-solver';
import {ExpressionGroup} from '../../expression-group';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './ex-kmap-to-expr.component.html',
  styleUrls: ['./ex-kmap-to-expr.component.css']
})
export class ExKmapToExprComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExKmapToExpr>;
  kmap = new KarnaughMap();
  bestGroups: number[][];

  answersForSelectedGroups: ExpressionGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExKmapToExprService
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
        return;
      }
      if (this.interKmapComponent) {
        this.interKmapComponent.premarkedCells = exercise.cells;
        this.interKmapComponent.ngOnInit();
      }
      this.bestGroups = BestGroupsSolver
        .findBestGroups(this.kmap.cellsToMap(exercise.cells))
        .map(group => this.kmap.expressionGroupToCells(group).sort((n1, n2) => n1 - n2));
      this.resetComponent();
    });
  }

  resetComponent() {
    this.answersForSelectedGroups = [];
  }

  onGroup() {
    this.interKmapComponent.onGroup();
    this.answersForSelectedGroups.push(new ExpressionGroup(null, null, null, null));
  }

  removeAnswerGroup(index: number) {
    this.interKmapComponent.removeAnswerGroup(index);
    this.answersForSelectedGroups.splice(index, 1);
  }

}
