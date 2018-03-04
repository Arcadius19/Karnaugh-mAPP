import { Component, OnInit } from '@angular/core';
import {ExKmapToExprService} from '../exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';
import {ExFindBestGroupsService} from '../exercises/exercise-types/find-best-groups/ex-find-best-groups.service';
import {ExExprToKmapService} from '../exercises/exercise-types/expr-to-kmap/ex-expr-to-kmap.service';
import {ExLabelSquaresService} from '../quiz/label-squares/ex-label-squares.service';
import {ExNameGroupService} from '../exercises/exercise-types/name-group/ex-name-group.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {
  exercises = [];

  constructor(
    private labelSquaresService: ExLabelSquaresService,
    private exprToKmapService: ExExprToKmapService,
    private findBestGroupsService: ExFindBestGroupsService,
    private nameGroupService: ExNameGroupService,
    private kmapToExprService: ExKmapToExprService
  ) { }

  ngOnInit() {
    this.exercises.push(this.labelSquaresService.getBasicPractice());
    this.exercises.push(this.exprToKmapService.getBasicPractice());
    this.exercises.push(this.findBestGroupsService.getBasicPractice());
    this.exercises.push(this.nameGroupService.getBasicPractice());
    this.exercises.push(this.kmapToExprService.getBasicPractice());
  }
}
