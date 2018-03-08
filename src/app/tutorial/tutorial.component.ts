import { Component, OnInit } from '@angular/core';
import {KarnaughMap} from '../auxiliary/karnaugh-map';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  flagA = 8;
  flagB = 4;
  flagC = 2;
  flagD = 1;
  flags = [this.flagA, this.flagB, this.flagC, this.flagD];
  alphabet = 'abcdefghijklmnop';
  kmap = new KarnaughMap();

  highlightKmapCell: boolean[];
  highlightTableRow: boolean[];

  constructor() { }

  ngOnInit() {
    this.highlightKmapCell = new Array<boolean>(16).fill(false);
    this.highlightTableRow = new Array<boolean>(16).fill(false);
  }

  getVariableValue(decimal: number, flag: number) {
    return +!!(decimal & flag);
  }

}
