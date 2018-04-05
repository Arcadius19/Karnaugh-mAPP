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

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSubmit() {
    let feedback = new Feedback(this.rating, this.comment);
    this.contactService.sendFeedback(feedback)
      .subscribe(
        response => console.log('Response (component): ', response),
        error => console.log('Error (component): ', error)
      );
  }

}
