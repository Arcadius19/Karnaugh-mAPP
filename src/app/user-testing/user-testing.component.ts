import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-testing',
  templateUrl: './user-testing.component.html',
  styleUrls: ['./user-testing.component.css']
})
export class UserTestingComponent implements OnInit {
  utForm: FormGroup;
  success;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.utForm = this.fb.group({ // <-- the parent FormGroup
      personal: this.fb.group({
        student: null,
        tookCourse: null,
        kmapHear: null,
        kmapUse: null
      }),
      task0: this.fb.group({
        presentation: '',
        helpful: '',
        comment: ''
      }),
      task1: this.fb.group({
        easyNavigation: '',
        feedbackInformative: '',
        comment: ''
      }),
      task2: this.fb.group({
        labelSquares: '',
        exprToKmap: '',
        findBestGroups: '',
        nameGroup: '',
        kmapToExpr: '',
        minimiseExpr: ''
      }),
      task3: this.fb.group({
        informativePoints: '',
        progress: '',
        reset: '',
        comment: ''
      }),
      task4: this.fb.group({
        navigation: '',
        syntax: '',
        parameters: '',
        presentation: '',
        stepsClear: '',
        comment: ''
      }),
      general: this.fb.group({
        navigation: '',
        beneficial: '',
        rating: '',
        comment: ''
      })
    });
  }

  onSubmit() {
    this.ngOnInit();
    this.success = true;
    setTimeout(() => { this.success = null; }, 4000);
  }

}
