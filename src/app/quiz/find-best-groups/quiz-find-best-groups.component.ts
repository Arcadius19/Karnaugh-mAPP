import {Component, OnInit} from '@angular/core';
import {FindBestGroupsComponent} from '../../exercises/exercise-types/find-best-groups/find-best-groups.component';
import {ExFindBestGroups} from '../../exercises/exercise-types/find-best-groups/ex-find-best-groups.service';

@Component({
  selector: 'app-ex-find-best-groups',
  templateUrl: './quiz-find-best-groups.component.html',
  styleUrls: ['./quiz-find-best-groups.component.css']
})
export class QuizFindBestGroupsComponent extends FindBestGroupsComponent implements OnInit {
  routePath = 'exercise';
  points: number;

  getQuestion(params) {
    return this.service.getExerciseTestAsync(params.get('id'));
  }

  populateProperties(exercise: ExFindBestGroups) {
    super.populateProperties(exercise);
    this.points = exercise.points;
  }

  onVerify() {
    super.onVerify();
    if (this.correct) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }
  }

}
