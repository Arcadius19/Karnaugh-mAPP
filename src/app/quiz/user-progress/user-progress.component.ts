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

  constructor(public progressModal: BsModalRef, private completionUpdateService: CompletionExUpdateService) { }

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
      this.completionUpdateService.removeCompletion(exID, qID);
    }
  }

  onResetAll() {
    localStorage.clear();
    localStorage.setItem('totalPoints', String(0));
    this.completionUpdateService.removeAllCompletes();
  }

}
