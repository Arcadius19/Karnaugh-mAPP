import { Component, OnInit } from '@angular/core';
import {FindBestGroupsComponent} from '../../exercises/exercise-types/find-best-groups/find-best-groups.component';

@Component({
  selector: 'app-practice-find-best-groups',
  templateUrl: './practice-find-best-groups.component.html',
  styleUrls: ['./practice-find-best-groups.component.css']
})
export class PracticeFindBestGroupsComponent extends FindBestGroupsComponent implements OnInit {
  routePath = 'practice';
  foundResolution: boolean;

  resetComponent() {
    super.resetComponent();
    this.foundResolution = null;
  }

  onVerify() {
    this.foundResolution = this.interKmapComponent.checkForResolution();
    if (!this.foundResolution) {
      super.onVerify();
    }
  }

  removeAnswerGroup(i: number) {
    this.interKmapComponent.removeAnswerGroup(i);
    this.foundResolution = false;
    this.correct = null;
  }
}
