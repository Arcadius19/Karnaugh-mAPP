import {Component, Input, OnInit} from '@angular/core';
import {KarnaughMap} from '../../auxiliary/karnaugh-map';

@Component({
  selector: 'app-kmap-tutorial',
  templateUrl: './kmap-tutorial.component.html',
  styleUrls: ['./kmap-tutorial.component.css']
})
export class KmapTutorialComponent implements OnInit {
  @Input() correct: boolean;
  @Input() correctCells = [];
  @Input() markedCells = [];

  kmap = new KarnaughMap();

  constructor() {
  }

  ngOnInit() {
  }

  belongToCorrect(i: number, j: number): boolean {
    for (let cell of this.correctCells) {
      if (this.kmap.cellIds[i][j] == cell) {
        return true;
      }
    }
    return false;
  }

  belongToMarked(i: number, j: number): boolean {
    for (let cell of this.markedCells) {
      if (this.kmap.cellIds[i][j] == cell) {
        return true;
      }
    }
    return false;
  }

}
