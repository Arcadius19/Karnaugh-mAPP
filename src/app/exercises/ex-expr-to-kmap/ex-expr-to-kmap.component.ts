import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ExExprToKmap, ExExprToKmapService} from './ex-expr-to-kmap.service';
import {Observable} from 'rxjs/Observable';
import {MathJax} from '../../mathjax-aux/math-jax';

@Component({
  selector: 'app-ex-expr-to-kmap',
  templateUrl: './ex-expr-to-kmap.component.html',
  styleUrls: ['./ex-expr-to-kmap.component.css']
})
export class ExExprToKmapComponent implements OnInit {

  exercise$: Observable<ExExprToKmap>;
  markTrue: boolean;
  nVars = 4;  // may be changed to dynamic in future
  latexExpression: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExExprToKmapService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExercise(params.get('id')));

    // may change the type of exercise when a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      this.markTrue = Math.random() > 0.5;
      this.latexExpression = MathJax.toMathJax(exercise.expression);
    });
  }

}
