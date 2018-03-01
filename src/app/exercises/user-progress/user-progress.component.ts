import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {isNumeric} from 'rxjs/util/isNumeric';
import {local} from 'd3-selection';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.css']
})
export class UserProgressComponent implements OnInit {
  exercises;

  constructor(public progressModal: BsModalRef) { }

  ngOnInit() {
  }

  checkPoints(exID: number, qID: number, points: number): number {
    let qState = localStorage.getItem('ex' + exID + 'q' + qID);
    if (!qState) {
      return 0;
    } else {
      let qStateObject = JSON.parse(qState);
      return qStateObject.points;
    }
  }

  checkTotalAttempts(exID: number, qID: number): number {
    let qState = localStorage.getItem('ex' + exID + 'q' + qID);
    if (!qState) {
      return 0;
    } else {
      let qStateObject = JSON.parse(qState);
      return qStateObject.attempts;
    }
  }

  checkAttemptsUntilCorrect(exID: number, qID: number): string {
    let qState = localStorage.getItem('ex' + exID + 'q' + qID);
    if (!qState) {
      return '-';
    } else {
      let qStateObject = JSON.parse(qState);
      return qStateObject.attemptsUntilCorrect;
    }
  }

  onResetEntry(exID: number, qID: number, points: number) {
    let entry = localStorage.getItem('ex' + exID + 'q' + qID);
    if (entry) {
      localStorage.removeItem('ex' + exID + 'q' + qID);
      let currentTotal = +localStorage.getItem('totalPoints');
      localStorage.setItem('totalPoints', String(currentTotal - points));
    }
  }

  onResetAll() {
    localStorage.clear();
    localStorage.setItem('totalPoints', String(0));
  }

}
