import {KarnaughMap} from './karnaugh-map';

export class GridGroup {
  offRow: number;
  offCol: number;
  rangeRow: number;
  rangeCol: number;

  constructor(offRow: number, offCol: number, rangeRow: number, rangeCol: number) {
    this.offRow = offRow;
    this.offCol = offCol;
    this.rangeRow = rangeRow;
    this.rangeCol = rangeCol;
  }

  toString(): string {
    return `${this.offRow}, ${this.offCol}, ${this.rangeRow}, ${this.rangeCol}`;
  }

  toCells(nVars: number): number[] {
    if (nVars != 3 && nVars != 4) { return []; }

    let result = [];
    let kmap = new KarnaughMap(nVars);
    for (let i = this.offRow; i < this.offRow + this.rangeRow; i++ ) {
      for (let j = this.offCol; j < this.offCol + this.rangeCol; j++) {
        result.push(kmap.cellIds[i % kmap.cellIds.length][j % kmap.cellIds[0].length]);
      }
    }
    return result;
  }

}
