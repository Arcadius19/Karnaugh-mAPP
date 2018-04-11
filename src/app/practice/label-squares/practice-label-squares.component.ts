import { Component, OnInit } from '@angular/core';
import {LabelSquaresComponent} from '../../exercises/exercise-types/label-squares/label-squares.component';

@Component({
  selector: 'app-practice-label-squares',
  templateUrl: './practice-label-squares.component.html',
  styleUrls: ['../../exercises/exercise-types/label-squares/label-squares.component.css']
})
export class PracticeLabelSquaresComponent extends LabelSquaresComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    this.userAnswer[0][0] = 0;
    this.userAnswer[2][2] = 15;
  }

}
