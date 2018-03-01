import {Component, OnInit} from '@angular/core';
import {NameGroupComponent} from '../../exercises/exercise-types/name-group/name-group.component';

@Component({
  selector: 'app-ex-name-group',
  templateUrl: './ex-name-group.component.html',
  styleUrls: ['./ex-name-group.component.css']
})
export class ExNameGroupComponent extends NameGroupComponent implements OnInit {

}
