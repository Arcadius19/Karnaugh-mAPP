import { Component, OnInit } from '@angular/core';
import {KarnaughMap} from '../../auxiliary/karnaugh-map';
import {ExLabelSquaresService} from './ex-label-squares.service';

@Component({
  selector: 'app-ex-label-squares',
  templateUrl: './ex-label-squares.component.html',
  styleUrls: ['./ex-label-squares.component.css']
})
export class ExLabelSquaresComponent implements OnInit {
  id: number;
  points: number;

  kmap: KarnaughMap;
  userAnswer: number[][];
  submitted: boolean;
  correct: boolean;

  constructor(
    private service: ExLabelSquaresService
  ) { }

  ngOnInit() {
    this.id = 1;
    this.points = this.service.getExerciseTest(1).points;
    this.kmap = new KarnaughMap(4);
    this.userAnswer = this.kmap.cellIds.map(row => row.map(cell => null));
    this.submitted = false;
    this.correct = null;
  }

  onVerify() {
    this.submitted = true;
    this.correct = this.userAnswer.every((row, i) => row.every((cell, j) => cell == this.kmap.cellIds[i][j]));
    if (this.correct == true) {
      this.service.addPointsToTotal(this.id, this.points);
    } else {
      this.service.addAttempt(this.id);
    }
  }

  isInputValid(input: number | string): boolean {
    return input == null || +input >= 0 && +input <= 15;
  }

  isFormValid(): boolean {
    return this.userAnswer.every(row => row.every(cell => this.isInputValid(cell) && cell != null));
  }

}
