import {Component, OnInit, ViewChild} from '@angular/core';
import {InteractiveKmapComponent} from '../../interactive-kmap/interactive-kmap.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExFindBestGroups, ExFindBestGroupsService} from '../../exercises/exercise-types/find-best-groups/ex-find-best-groups.service';
import {Observable} from 'rxjs/Observable';
import {KarnaughMap} from '../../auxiliary/karnaugh-map';
import {BestGroupsSolver} from '../../auxiliary/best-groups-solver';
import {FindBestGroupsComponent} from '../../exercises/exercise-types/find-best-groups/find-best-groups.component';

@Component({
  selector: 'app-ex-find-best-groups',
  templateUrl: './ex-find-best-groups.component.html',
  styleUrls: ['./ex-find-best-groups.component.css']
})
export class ExFindBestGroupsComponent extends FindBestGroupsComponent implements OnInit {

}
