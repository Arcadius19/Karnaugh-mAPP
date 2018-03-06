import {Component, Input, OnInit} from '@angular/core';
import {KarnaughMap} from '../auxiliary/karnaugh-map';

@Component({
  selector: 'app-interactive-kmap',
  templateUrl: './interactive-kmap.component.html',
  styleUrls: ['./interactive-kmap.component.css']
})
export class InteractiveKmapComponent implements OnInit {
  @Input() nVars = 4;       // default
  @Input() active = true;   // default
  @Input() partiallyActive;
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
    this.partiallyActive = (this.premarkedCells) ? true : null;
    this.marked = this.kmap.cellIds.map(row => row.map(cell => 0));
    this.selectedGroups = [];
    this.highlight = this.kmap.cellIds.map(row => row.map(cell => 0));
    this.doubleSelected = false;
    this.emptySelected = false;
  }

  onClickCell(i: number, j: number) {
    if (this.active && (!this.partiallyActive || this.premarked[i][j] == 1)) {
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
    let successGroup = null;

    if (selectedCells.length == 0) {
      this.emptySelected = true;
      setTimeout(() => { this.emptySelected = false; }, 2000);
    } else if (!this.checkIfAlreadySelected(selectedCells)) {
      this.selectedGroups.push(selectedCells);
      successGroup = true;
    } else {
      this.doubleSelected = true;
      setTimeout(() => { this.doubleSelected = false; }, 2000);
    }
    this.marked = this.marked.map(row => row.map(cell => 0));

    return (successGroup) ? selectedCells : null;
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

  // bestGroupsOfGroups is an array of all possible combinations of best groups (they all have the same length)
  // return true if selected is the same as one of these best solutions
  compareSelectedToBest(bestGroupsOfGroups: number[][][]): boolean {
    if (this.selectedGroups.length != bestGroupsOfGroups[0].length) { return false; }

    for (let index = 0; index < bestGroupsOfGroups.length; index++) {
      let found = 0;
      loopSelectedGroups:
        for (let selectedGroup of this.selectedGroups) {
          loopSolutionGroups:
            for (let solutionGroup of bestGroupsOfGroups[index]) {
              if (selectedGroup.length == solutionGroup.length) {
                for (let i in selectedGroup) {
                  if (selectedGroup[i] != solutionGroup[i]) {
                    continue loopSolutionGroups;
                  }
                }
                found++;
                continue loopSelectedGroups;
              }
            }
        }

      if (found == bestGroupsOfGroups[index].length) {
        return true;
      }
    }

    return false;
  }

}
