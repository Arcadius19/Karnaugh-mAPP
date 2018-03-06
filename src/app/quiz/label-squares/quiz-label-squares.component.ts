import { Component, OnInit } from '@angular/core';
import {ExLabelSquaresService} from './ex-label-squares.service';
import {LabelSquaresComponent} from '../../exercises/exercise-types/label-squares/label-squares.component';

@Component({
  selector: 'app-ex-label-squares',
  templateUrl: './quiz-label-squares.component.html',
  styleUrls: ['../../exercises/exercise-types/label-squares/label-squares.component.css']
})
export class QuizLabelSquaresComponent extends LabelSquaresComponent implements OnInit {
  id: number;
  points: number;

  constructor(
    private service: ExLabelSquaresService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.id = 1;
    this.points = this.service.getExerciseTest(1).points;
  }

  onVerify() {
    super.onVerify();
    if (this.correct == true) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }
  }

}
