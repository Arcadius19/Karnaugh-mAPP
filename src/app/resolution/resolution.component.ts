import { Component, OnInit } from '@angular/core';
import {KarnaughMap} from '../auxiliary/karnaugh-map';

@Component({
  selector: 'app-resolution',
  templateUrl: './resolution.component.html',
  styleUrls: ['./resolution.component.css']
})
export class ResolutionComponent implements OnInit {
  kmap = new KarnaughMap();

  constructor() { }

  ngOnInit() {
  }

  belongTo(i: number, j: number, cells: number[]): boolean {
    for (let cell of cells) {
      if (this.kmap.cellIds[i][j] == cell) {
        return true;
      }
    }
    return false;
  }

}
