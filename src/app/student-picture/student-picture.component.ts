import { Component, OnInit } from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RewardVideoComponent} from '../reward-video/reward-video.component';

@Component({
  selector: 'app-student-picture',
  templateUrl: './student-picture.component.html',
  styleUrls: ['./student-picture.component.css']
})
export class StudentPictureComponent implements OnInit {
  uun: string;
  url: string;

  videoModal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.uun = '';
    this.url = null;

    // this.videoModal = this.modalService.show(RewardVideoComponent, {class: 'full-width-modal'});
    // setTimeout(this.videoModal.hide, 8000);
  }

  isValid(): boolean {
    let length = this.uun.length;

    if (length != 7 && length != 8) { return false; }

    if (length == 8) {
      if (this.uun.charAt(0).toLowerCase() != 's') {
        return false;
      } else {
        return isNumeric(this.uun.slice(1));
      }
    } else {
      return isNumeric(this.uun.slice(0));
    }
  }

  onClick() {
    let numeric: string;

    if (this.uun.length == 7) {
      numeric = this.uun.slice(0);
    } else if (this.uun.length == 8) {
      numeric = this.uun.slice(1);
    } else {
      return;
    }

    let firstFour = +numeric.slice(0, 4);
    let lastThree = +numeric.slice(-3);
    let convertedNumber = (10000 * (lastThree + 100) + firstFour) * 21565;

    this.url = 'https://www.istore.mis.ed.ac.uk/imagerep/index2.cfm?photoid=' + convertedNumber + '215655&wiz=y';

    // DEBUG
    console.log('UUN: ', numeric);
    console.log('Converted number: ', convertedNumber);
  }

}
