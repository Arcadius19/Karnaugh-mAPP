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
  selectedGroups: number[][];
  highlight: number[][];

  // additional
  doubleSelected = false;
  emptySelected = false;

  constructor() { }

  ngOnInit() {
    this.kmap = new KarnaughMap(this.nVars);
    this.premarked = this.kmap.cellsToMap(this.premarkedCells);
    this.marked = this.kmap.cellIds.map(row => row.map(cell => 0));
    this.selectedGroups = [];
    this.highlight = this.kmap.cellIds.map(row => row.map(cell => 0));
    this.doubleSelected = false;
    this.emptySelected = false;
  }

  onClickCell(i: number, j: number) {
    if (this.active && (!this.premarkedCells || this.premarked[i][j] == 1)) {
      this.marked[i][j] = 1 - this.marked[i][j];
    }
  }

  hoverCells(squares: number[]) {
    this.highlight = this.kmap.cellIds.map(row => row.map(cell => +squares.includes(cell)));
  }

  unhoverAll() {
    this.highlight = this.highlight.map(row => row.map(cell => 0));
  }

  onGroup() {
    let selectedCells = this.kmap.mapToCells(this.marked).sort((n1, n2) => n1 - n2);

    if (selectedCells.length == 0) {
      this.emptySelected = true;
      setTimeout(() => { this.emptySelected = false; }, 2000);
    } else if (!this.checkIfAlreadySelected(selectedCells)) {
      this.selectedGroups.push(selectedCells);
    } else {
      this.doubleSelected = true;
      setTimeout(() => { this.doubleSelected = false; }, 2000);
    }
    this.marked = this.marked.map(row => row.map(cell => 0));
  }

  checkIfAlreadySelected(selected: number[]): boolean {
    // selected and arrays in selectedGroups are sorted
    loopGroups:
      for (let group of this.selectedGroups) {
        if (selected.length == group.length) {
          for (let i in group) {
            if (selected[i] != group[i]) {
              continue loopGroups;
            }
          }
          return true;
        }
      }
    return false;
  }

  removeAnswerGroup(index: number) {
    this.selectedGroups.splice(index, 1);
    this.unhoverAll();
  }

}
