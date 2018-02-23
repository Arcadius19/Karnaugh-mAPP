import { Component, OnInit } from '@angular/core';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap/ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../mathjax-aux/math-jax';
import {ExFindBestGroups, ExFindBestGroupsService} from './ex-find-best-groups/ex-find-best-groups.service';
import {ExNameGroup, ExNameGroupService} from './ex-name-group/ex-name-group.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  providers: [
    ExExprToKmapService,
    ExFindBestGroupsService,
    ExNameGroupService
  ]
})
export class ExercisesComponent implements OnInit {
  exprToKmapExercises: ExExprToKmap[];
  findBestGroupsExercises: ExFindBestGroups[];
  nameGroupExercises: ExNameGroup[];

  constructor(
    private exprToKmapService: ExExprToKmapService,
    private findBestGroupsService: ExFindBestGroupsService,
    private nameGroupService: ExNameGroupService
    ) { }

  ngOnInit() {
    this.exprToKmapExercises = this.exprToKmapService.getExercises();
    this.findBestGroupsExercises = this.findBestGroupsService.getExercises();
    this.nameGroupExercises = this.nameGroupService.getExercises();
  }

  toBrowserText(expression: string): string {
    return MathJax.toBrowserText(expression);
  }

}
