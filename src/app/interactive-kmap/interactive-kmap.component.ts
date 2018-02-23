import {Component, Input, OnInit} from '@angular/core';
import {KarnaughMap} from '../karnaugh-map';

@Component({
  selector: 'app-interactive-kmap',
  templateUrl: './interactive-kmap.component.html',
  styleUrls: ['./interactive-kmap.component.css']
})
export class InteractiveKmapComponent implements OnInit {
  @Input() nVars = 4; // default
  @Input() active = true; // default
  @Input() premarkedCells: number[] = null;

  kmap: KarnaughMap;
  premarked: number[][];
  marked: number[][];

  // additional
  highlight: number[][];

  constructor() { }

  ngOnInit() {
    this.kmap = new KarnaughMap(this.nVars);
    this.marked = this.kmap.cellIds.map(row => row.map(cell => 0));
    this.premarked = this.kmap.cellsToMap(this.premarkedCells);
    this.highlight = this.kmap.cellIds.map(row => row.map(cell => 0));
  }

  onClickCell(i: number, j: number) {
    if (this.active && (!this.premarkedCells || this.premarked[i][j] == 1)) {
      this.marked[i][j] = 1 - this.marked[i][j];
    }
  }

}
