import { Component, OnInit } from '@angular/core';
import {KarnaughMap} from '../../../auxiliary/karnaugh-map';

@Component({
  selector: 'app-label-squares',
  template: ''
})
export class LabelSquaresComponent implements OnInit {
  kmap: KarnaughMap;
  userAnswer: number[][];
  submitted: boolean;
  correct: boolean;

  constructor() { }

  ngOnInit() {
    this.kmap = new KarnaughMap(4);
    this.userAnswer = this.kmap.cellIds.map(row => row.map(cell => null));
    this.submitted = false;
    this.correct = null;
  }

  onVerify() {
    this.submitted = true;
    this.correct = this.userAnswer.every((row, i) => row.every((cell, j) => cell == this.kmap.cellIds[i][j]));
  }

  isInputValid(input: number | string): boolean {
    return input == null || +input >= 0 && +input <= 15;
  }

  isFormValid(): boolean {
    return this.userAnswer.every(row => row.every(cell => this.isInputValid(cell) && cell != null));
  }

}
