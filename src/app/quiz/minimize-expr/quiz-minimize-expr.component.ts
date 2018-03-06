import { Component, OnInit } from '@angular/core';
import {MinimizeExprComponent} from '../../exercises/exercise-types/minimize-expr/minimize-expr.component';
import {ExMinimizeExpr} from '../../exercises/exercise-types/minimize-expr/minimize-expr.service';

@Component({
  selector: 'app-quiz-minimize-expr',
  templateUrl: './quiz-minimize-expr.component.html',
  styleUrls: ['./quiz-minimize-expr.component.css']
})
export class QuizMinimizeExprComponent extends MinimizeExprComponent implements OnInit {
  routePath = 'quiz';
  points: number;

  getQuestion(params) {
    return this.service.getExerciseTestAsync(params.get('id'));
  }

  populateProperties(exercise: ExMinimizeExpr) {
    super.populateProperties(exercise);
    this.points = exercise.points;
    this.dnfForm = Math.random() > 0.5;
  }

  onVerifyGrouping() {
    super.onVerifyGrouping();
    if (this.finalCorrect == true) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }
  }


}
