import {CustomParser} from './custom-parser';

export class KarnaughMap {
  nVars: number;
  cellIds: number[][];
  binariesVertical: string[];

  flagA: number;
  flagB: number;
  flagC: number;
  flagD: number;

  constructor(nVars: number) {
    if (!(nVars == 3 || nVars == 4)) {
      throw new Error('Invalid number of arguments. The number should be 3 or 4.');
    }

    let binariesVertical: string[];
    let binariesHorizontal: string[];

    if (nVars == 3) {
      this.cellIds = [[], []];
      this.flagA = 4;
      this.flagB = 2;
      this.flagC = 1;
      binariesVertical = ['0', '1'];
      binariesHorizontal = ['00', '01', '11', '10'];
    }

    if (nVars == 4) {
      this.cellIds = [[], [], [], []];
      this.flagA = 8;
      this.flagB = 4;
      this.flagC = 2;
      this.flagD = 1;
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

  public evaluate(query: string): number[][] {
    let aVar: Boolean;
    let bVar: Boolean;
    let cVar: Boolean;
    let dVar: Boolean;
    let evaluation: Boolean;

    let evaluations = this.cellIds.slice(0).map(row => row.map(cell => 0));

    const parser = CustomParser.PARSER;
    let expression;
    try {
      query = CustomParser.preParse(query);
      expression = parser.parse(query);
      for (let i in this.cellIds) {
        for (let j in this.cellIds[i]) {
          let decimalNumber = this.cellIds[i][j];
          aVar = !!(decimalNumber & this.flagA);
          bVar = !!(decimalNumber & this.flagB);
          cVar = !!(decimalNumber & this.flagC);
          if (this.nVars == 3) {
            evaluation = expression.evaluate({ A: aVar, B: bVar, C: cVar });
          }
          if (this.nVars == 4) {
            dVar = !!(decimalNumber & this.flagD);
            evaluation = expression.evaluate({ A: aVar, B: bVar, C: cVar, D: dVar });
          }
          evaluations[i][j] = (evaluation) ? 1 : 0;
        }
      }
      // that should never happen as the query was first validated in the form component
    } catch (err) {
      console.log(err);
    }

    return evaluations;
  }

  cellsToMap(marked: number[]): number[][] {
    return this.cellIds.map(row => row.map(cell => (marked) ? +marked.includes(cell) : 0 ));
  }

  mapToCells(map: number[][]): number[] {
    let result = [];
    for (let i in map) {
      for (let j in map[i]) {
        if (map[i][j] != 0) {
          if (this.cellIds[i][j] != undefined) {
            result.push(this.cellIds[i][j]);
          }
        }
      }
    }
    return result;
  }

}
