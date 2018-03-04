import { Component, OnInit } from '@angular/core';
import {KmapToExprComponent} from '../../exercises/exercise-types/kmap-to-expr/kmap-to-expr.component';

@Component({
  selector: 'app-practice-kmap-to-expr',
  templateUrl: './practice-kmap-to-expr.component.html',
  styleUrls: ['./practice-kmap-to-expr.component.css']
})
export class PracticeKmapToExprComponent extends KmapToExprComponent implements OnInit {
  routePath = 'practice';

}
