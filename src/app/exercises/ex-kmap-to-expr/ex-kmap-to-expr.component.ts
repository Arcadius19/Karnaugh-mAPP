import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {Observable} from 'rxjs/Observable';
import {ExKmapToExpr, ExKmapToExprService} from './ex-kmap-to-expr.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-ex-kmap-to-expr',
  templateUrl: './ex-kmap-to-expr.component.html',
  styleUrls: ['./ex-kmap-to-expr.component.css']
})
export class ExKmapToExprComponent implements OnInit {
  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExKmapToExpr>;
  cells: number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExKmapToExprService
  ) { }

  ngOnInit() {
    this.exercise$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getExerciseAsync(params.get('id')));

    // When a new exercise is loaded
    this.exercise$.subscribe(exercise => {
      if (!exercise) {
        // such an exercise does not exist
        this.router.navigate(['/exercises']);
        return;
      }


    });
  }

}
