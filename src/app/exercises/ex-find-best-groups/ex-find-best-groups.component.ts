import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExFindBestGroups, ExFindBestGroupsService} from './ex-find-best-groups.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-ex-find-best-groups',
  templateUrl: './ex-find-best-groups.component.html',
  styleUrls: ['./ex-find-best-groups.component.css']
})
export class ExFindBestGroupsComponent implements OnInit {

  @ViewChild(InteractiveKmapComponent)
  private interKmapComponent: InteractiveKmapComponent;

  exercise$: Observable<ExFindBestGroups>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExFindBestGroupsService
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
