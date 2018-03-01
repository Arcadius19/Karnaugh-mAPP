import {Component, OnInit} from '@angular/core';
import {KmapToExprComponent} from '../../exercises/exercise-types/kmap-to-expr/kmap-to-expr.component';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './ex-kmap-to-expr.component.html',
  styleUrls: ['./ex-kmap-to-expr.component.css']
})
export class ExKmapToExprComponent extends KmapToExprComponent implements OnInit {

}
