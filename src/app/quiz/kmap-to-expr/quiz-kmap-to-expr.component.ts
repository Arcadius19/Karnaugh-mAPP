import {Component, OnInit} from '@angular/core';
import {KmapToExprComponent} from '../../exercises/exercise-types/kmap-to-expr/kmap-to-expr.component';
import {ExKmapToExpr} from '../../exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './quiz-kmap-to-expr.component.html',
  styleUrls: ['./quiz-kmap-to-expr.component.css']
})
export class QuizKmapToExprComponent extends KmapToExprComponent implements OnInit {
  routePath = 'quiz';
  points: number;

  getQuestion(params) {
    return this.service.getExerciseTestAsync(params.get('id'));
  }

  populateParameters(exercise: ExKmapToExpr) {
    super.populateParameters(exercise);
    this.points = exercise.points;
  }

  onVerify() {
    super.onVerify();
    if (this.finalCorrect == true) {
      this.service.addPointsToTotal(this.id, this.points);
      this.interKmapComponent.active = false;
    } else {
      this.service.addAttempt(this.id);
    }
  }

}
