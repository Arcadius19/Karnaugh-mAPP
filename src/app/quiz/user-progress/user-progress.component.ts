import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {CompletionExUpdateService} from '../completion-ex-update.service';

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.css'],
})
export class UserProgressComponent implements OnInit {
  exercises;
  badgeColors;
  backgroundColors;
  completed = [];

  constructor(public progressModal: BsModalRef, private completionUpdateService: CompletionExUpdateService) { }

  ngOnInit() {
    this.badgeColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    this.backgroundColors = ['rgba(255, 0, 0, 0.3)', 'rgba(255, 165, 0, 0.3)', 'rgba(255, 255, 0, 0.3)',
    'rgba(0, 128, 0, 0.3)', 'rgba(0, 0, 255, 0.3)', 'rgba(75, 0, 130, 0.3)', 'rgba(238, 130, 238, 0.3)'];
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
      this.completionUpdateService.removeCompletion(exID, qID);
    }
  }

  onResetAll() {
    localStorage.clear();
    localStorage.setItem('totalPoints', String(0));
    this.completionUpdateService.removeAllCompletes();
  }

  checkIfGroupCompleted(index): boolean {
    console.log(this.exercises[index]);
    return this.exercises[index].questions.every(question => question.completed == true);
  }

}
