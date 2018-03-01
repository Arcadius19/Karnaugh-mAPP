import { Component, OnInit } from '@angular/core';
import {MathJax} from '../auxiliary/mathjax-aux/math-jax';
import {ExLabelSquaresService} from './ex-label-squares/ex-label-squares.service';
import {ExExprToKmapService} from '../exercises/exercise-types/expr-to-kmap/ex-expr-to-kmap.service';
import {ExFindBestGroupsService} from '../exercises/exercise-types/find-best-groups/ex-find-best-groups.service';
import {ExNameGroupService} from '../exercises/exercise-types/name-group/ex-name-group.service';
import {ExKmapToExprService} from '../exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';
import {UserProgressComponent} from './user-progress/user-progress.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises = [];
  maxPoints = 0;
  progressModal: BsModalRef;

  constructor(
    private labelSquaresService: ExLabelSquaresService,
    private exprToKmapService: ExExprToKmapService,
    private findBestGroupsService: ExFindBestGroupsService,
    private nameGroupService: ExNameGroupService,
    private kmapToExprService: ExKmapToExprService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.exercises.push(this.labelSquaresService.getBasicTest());
    this.exercises.push(this.exprToKmapService.getBasicTest());
    this.exercises.push(this.findBestGroupsService.getBasicTest());
    this.exercises.push(this.nameGroupService.getBasicTest());
    this.exercises.push(this.kmapToExprService.getBasicTest());

    for (let exercises of this.exercises) {
      exercises.questions.forEach(exercise => this.maxPoints += exercise.points);
    }

    if (!localStorage.getItem('totalPoints')) {
      localStorage.setItem('totalPoints', String(0));
    }
  }

  toBrowserText(expression: string): string {
    return MathJax.toBrowserText(expression);
  }

  checkPoints(): number {
    return +localStorage.getItem('totalPoints');
  }

  pointsRatio(): string {
    return Math.round(this.checkPoints() / this.maxPoints * 100) + '%';
  }

  onReset() {
    localStorage.clear();
  }

  openUserProgress() {
    this.progressModal = this.modalService.show(UserProgressComponent);
    this.progressModal.content.exercises = this.exercises;
  }

}
