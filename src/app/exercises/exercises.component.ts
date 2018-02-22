import { Component, OnInit } from '@angular/core';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap/ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../mathjax-aux/math-jax';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  providers: [ExExprToKmapService]
})
export class ExercisesComponent implements OnInit {
  exprToKmapExercises: ExExprToKmap[];

  constructor(private exprToKmapService: ExExprToKmapService) {
  }

  ngOnInit() {
    this.exprToKmapExercises = this.exprToKmapService.getExercises();
  }

  toBrowserText(expression: string): string {
    return MathJax.toBrowserText(expression);
  }

}
