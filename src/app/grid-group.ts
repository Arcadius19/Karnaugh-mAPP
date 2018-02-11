export class GridGroup {
  private _offRow: number;
  private _offCol: number;
  private _rangeRow: number;
  private _rangeCol: number;

  constructor(offRow: number, offCol: number, rangeRow: number, rangeCol: number) {
    this._offRow = offRow;
    this._offCol = offCol;
    this._rangeRow = rangeRow;
    this._rangeCol = rangeCol;
  }

  get offRow(): number {
    return this._offRow;
  }

  set offRow(value: number) {
    this._offRow = value;
  }

  get offCol(): number {
    return this._offCol;
  }

  set offCol(value: number) {
    this._offCol = value;
  }

  get rangeRow(): number {
    return this._rangeRow;
  }

  set rangeRow(value: number) {
    this._rangeRow = value;
  }

  get rangeCol(): number {
    return this._rangeCol;
  }

  set rangeCol(value: number) {
    this._rangeCol = value;
  }

  toString(): string {
    return `${this.offRow}, ${this.offCol}, ${this.rangeRow}, ${this.rangeCol}`;
  }
}
