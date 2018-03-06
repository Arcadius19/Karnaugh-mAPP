import {Component, OnInit} from '@angular/core';
import {NameGroupComponent} from '../../exercises/exercise-types/name-group/name-group.component';
import {ExNameGroup} from '../../exercises/exercise-types/name-group/ex-name-group.service';

@Component({
  selector: 'app-ex-name-group',
  templateUrl: './quiz-name-group.component.html',
  styleUrls: ['./quiz-name-group.component.css']
})
export class QuizNameGroupComponent extends NameGroupComponent implements OnInit {
  routePath = 'quiz';
  points: number;

  getQuestion(params) {
    return this.service.getExerciseTestAsync(params.get('id'));
  }

  populateParameters(exercise: ExNameGroup) {
    super.populateParameters(exercise);
    this.points = exercise.points;
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
