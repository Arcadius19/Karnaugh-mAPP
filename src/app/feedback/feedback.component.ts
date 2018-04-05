import { Component, OnInit } from '@angular/core';
import {ContactService} from '../auxiliary/contact.service';
import {Feedback} from '../auxiliary/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  rating: number;
  comment: string;

  submitted = false;
  success = null;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    let feedback = new Feedback(this.rating, this.comment);
    this.contactService.sendFeedback(feedback)
      .subscribe(
        response => {
          this.success = true;
          this.rating = null;
          this.comment = null;
          setTimeout(() => { this.success = null; }, 3000);
        },
        error => {
          this.success = false;
          setTimeout(() => { this.success = null; }, 4000);
        }
      );
  }

}
