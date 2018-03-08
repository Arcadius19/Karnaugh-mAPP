import {Component, OnInit, SimpleChange} from '@angular/core';
import {ExLabelSquaresService} from '../exercises/exercise-types/label-squares/ex-label-squares.service';
import {ExExprToKmapService} from '../exercises/exercise-types/expr-to-kmap/ex-expr-to-kmap.service';
import {ExFindBestGroupsService} from '../exercises/exercise-types/find-best-groups/ex-find-best-groups.service';
import {ExNameGroupService} from '../exercises/exercise-types/name-group/ex-name-group.service';
import {ExKmapToExprService} from '../exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';
import {UserProgressComponent} from './user-progress/user-progress.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MinimizeExprService} from '../exercises/exercise-types/minimize-expr/minimize-expr.service';
import {ExerciseService} from '../exercises/exercise.service';
import {CompletionExUpdateService} from './completion-ex-update.service';

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
    private minimizeExprService: MinimizeExprService,
    private modalService: BsModalService,
    private completionUpdateService: CompletionExUpdateService
    ) { }

  ngOnInit() {
    this.exercises.push(this.labelSquaresService.getBasicTest());
    this.exercises.push(this.exprToKmapService.getBasicTest());
    this.exercises.push(this.findBestGroupsService.getBasicTest());
    this.exercises.push(this.nameGroupService.getBasicTest());
    this.exercises.push(this.kmapToExprService.getBasicTest());
    this.exercises.push(this.minimizeExprService.getBasicTest());

    for (let exercise of this.exercises) {
      exercise.questions.forEach(question => {
        this.maxPoints += question.points;
        question.completed = ExerciseService.checkIfCompleted(exercise.id, question.id);
      });
    }

    if (!localStorage.getItem('totalPoints')) {
      localStorage.setItem('totalPoints', String(0));
    }

    this.labelSquaresService.completionUpdate$.subscribe(qID => this.updateCompletion(this.labelSquaresService.id, qID));
    this.exprToKmapService.completionUpdate$.subscribe(qID => this.updateCompletion(this.exprToKmapService.id, qID));
    this.findBestGroupsService.completionUpdate$.subscribe(qID => this.updateCompletion(this.findBestGroupsService.id, qID));
    this.nameGroupService.completionUpdate$.subscribe(qID => this.updateCompletion(this.nameGroupService.id, qID));
    this.kmapToExprService.completionUpdate$.subscribe(qID => this.updateCompletion(this.kmapToExprService.id, qID));
    this.minimizeExprService.completionUpdate$.subscribe(qID => this.updateCompletion(this.minimizeExprService.id, qID));
    this.completionUpdateService.completionDelete$.subscribe(IDs => this.updateCompletion(IDs.exID, IDs.qID, false));
    this.completionUpdateService.uncompleteAll$.subscribe(() => this.removeAllCompletions());
  }

  checkTotalPoints(): number {
    return +localStorage.getItem('totalPoints');
  }

  totalPointsRatio(): string {
    return Math.round(this.checkTotalPoints() / this.maxPoints * 100) + '%';
  }

  openUserProgress() {
    this.progressModal = this.modalService.show(UserProgressComponent);
    this.progressModal.content.exercises = this.exercises;
  }

  updateCompletion(exID, qID, isCompleted = true) {
    this.exercises.forEach(exercise => {
      if (exercise.id == exID) {
        exercise.questions.forEach(question => {
          if (question.id == qID) {
            question.completed = isCompleted;
          }
        });
      }
    });
  }

  removeAllCompletions() {
    this.exercises.forEach(exercise => exercise.questions.forEach(question => question.completed = false));
  }

}
