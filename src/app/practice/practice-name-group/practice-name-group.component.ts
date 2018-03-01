import { Component, OnInit } from '@angular/core';
import {NameGroupComponent} from '../../exercises/exercise-types/name-group/name-group.component';

@Component({
  selector: 'app-practice-name-group',
  templateUrl: './practice-name-group.component.html',
  styleUrls: ['./practice-name-group.component.css']
})
export class PracticeNameGroupComponent extends NameGroupComponent implements OnInit {
  routePath = 'practice';

}
