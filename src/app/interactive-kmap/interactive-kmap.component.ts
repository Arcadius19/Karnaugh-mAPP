import {Component, Input, OnInit} from '@angular/core';
import {KarnaughMap} from '../karnaugh-map';

@Component({
  selector: 'app-interactive-kmap',
  templateUrl: './interactive-kmap.component.html',
  styleUrls: ['./interactive-kmap.component.css']
})
export class InteractiveKmapComponent implements OnInit {
  @Input() nVars = 4; // default

  kmap: KarnaughMap;
  marked: number[];

  constructor() { }

  ngOnInit() {
    this.kmap = new KarnaughMap(this.nVars);
  }

}
