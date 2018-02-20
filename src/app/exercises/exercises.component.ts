import { Component, OnInit } from '@angular/core';
import {ExExprToKmapService} from './ex-expr-to-kmap/ex-expr-to-kmap.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  providers: [ExExprToKmapService]
})
export class ExercisesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
