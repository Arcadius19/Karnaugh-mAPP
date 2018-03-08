import { Component, OnInit } from '@angular/core';
import {MinimizeExprComponent} from '../../exercises/exercise-types/minimize-expr/minimize-expr.component';

@Component({
  selector: 'app-practice-minimize-expr',
  templateUrl: './practice-minimize-expr.component.html',
  styleUrls: ['./practice-minimize-expr.component.css']
})
export class PracticeMinimizeExprComponent extends MinimizeExprComponent implements OnInit {
  routePath = 'practice';

  onVerifyGrouping() {
    super.onVerifyGrouping();
    if (this.foundBestGroups) {
      this.interKmapComponent.active = false;
    }
  }

}
