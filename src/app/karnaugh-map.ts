export class KarnaughMap {
  nVars: number;
  cellIds: number[][];
  binariesVertical: string[];

  constructor(nVars: number) {
    if (!(nVars == 3 || nVars == 4)) {
      throw new Error('Invalid number of arguments. The number should be 3 or 4.');
    }

    let binariesVertical: string[];
    let binariesHorizontal: string[];

    if (nVars == 3) {
      this.cellIds = [[], []];
      binariesVertical = ['0', '1'];
      binariesHorizontal = ['00', '01', '11', '10'];
    }

    if (nVars == 4) {
      this.cellIds = [[], [], [], []];
      binariesVertical = ['00', '01', '11', '10'];
      binariesHorizontal = ['00', '01', '11', '10'];
    }

    this.binariesVertical = binariesVertical;
    this.nVars = nVars;
    for (let i in binariesVertical) {
      for (let j in binariesHorizontal) {
        this.cellIds[i][j] = parseInt(binariesVertical[i] + binariesHorizontal[j], 2);
      }
    }

  }

}
