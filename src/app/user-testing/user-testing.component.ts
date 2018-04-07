import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ContactService} from '../auxiliary/contact.service';

@Component({
  selector: 'app-user-testing',
  templateUrl: './user-testing.component.html',
  styleUrls: ['./user-testing.component.css']
})
export class UserTestingComponent implements OnInit {
  utForm: FormGroup;
  success;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.utForm = this.fb.group({ // <-- the parent FormGroup
      personal: this.fb.group({
        isStudent: null,
        tookCourse: null,
        kmapHear: null,
        kmapUse: null
      }),
      task0: this.fb.group({
        presentation: null,
        helpful: null,
        comment: null
      }),
      task1: this.fb.group({
        easyNavigation: null,
        feedbackInformative: null,
        comment: null
      }),
      task2: this.fb.group({
        labelSquares: null,
        exprToKmap: null,
        findBestGroups: null,
        nameGroup: null,
        kmapToExpr: null,
        minimiseExpr: null
      }),
      task3: this.fb.group({
        informativePoints: null,
        progress: null,
        easyReset: null,
        comment: null
      }),
      task4: this.fb.group({
        navigation: null,
        syntax: null,
        parameters: null,
        presentation: null,
        stepsClear: null,
        comment: null
      }),
      general: this.fb.group({
        beneficial: null,
        navigation: null,
        aesthetic: null,
        rating: null,
        commentUseful: null,
        commentImprove: null
      })
    });
  }

  onSubmit() {
    this.contactService.sendUserTestingResponse(this.utForm.value)
      .subscribe(
        response => {
          this.ngOnInit();
          this.success = true;
          setTimeout(() => { this.success = null; }, 4000);
        },
        error => {
          this.success = false;
          setTimeout(() => { this.success = null; }, 4000);
        }
      );
  }

}
