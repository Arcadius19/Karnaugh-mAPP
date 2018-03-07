import {Component, OnInit } from '@angular/core';
import {ExprToKmapComponent} from '../../exercises/exercise-types/expr-to-kmap/expr-to-kmap.component';
import {ExExprToKmap} from '../../exercises/exercise-types/expr-to-kmap/ex-expr-to-kmap.service';

@Component({
  selector: 'app-ex-expr-to-kmap',
  templateUrl: './quiz-expr-to-kmap.component.html',
  styleUrls: ['./quiz-expr-to-kmap.component.css']
})
export class QuizExprToKmapComponent extends ExprToKmapComponent implements OnInit {
  routePath = 'quiz';
  points: number;

  getQuestion(params) {
    return this.service.getExerciseTestAsync(params.get('id'));
  }

  populateProperties(exercise: ExExprToKmap) {
    super.populateProperties(exercise);
    this.points = exercise.points;
  }

  onVerify() {
    this.correct = this.interKmapComponent.marked.every((row, i) => row.every((cell, j) => cell == this.solution[i][j]));

    if (this.correct) {
      this.service.addPointsToTotal(this.id, this. points);
      this.interKmapComponent.active = false;
    } else {
      this.service.addAttempt(this.id);
    }

  }

}
