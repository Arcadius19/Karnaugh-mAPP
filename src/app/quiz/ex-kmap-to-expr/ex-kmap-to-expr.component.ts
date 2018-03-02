import {Component, OnInit} from '@angular/core';
import {KmapToExprComponent} from '../../exercises/exercise-types/kmap-to-expr/kmap-to-expr.component';
import {ExKmapToExpr} from '../../exercises/exercise-types/kmap-to-expr/ex-kmap-to-expr.service';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './ex-kmap-to-expr.component.html',
  styleUrls: ['./ex-kmap-to-expr.component.css']
})
export class ExKmapToExprComponent extends KmapToExprComponent implements OnInit {
  routePath = 'exercise';

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
    } else {
      this.service.addAttempt(this.id);
    }
  }

}
