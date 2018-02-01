import { Component, OnInit } from '@angular/core';
import { ParserService } from '../parser.service';

@Component({
  selector: 'app-kmap',
  templateUrl: './kmap.component.html',
  styleUrls: ['./kmap.component.css']
})
export class KmapComponent implements OnInit {
  FLAG_A = 8; // 1000
  FLAG_B = 4; // 0100
  FLAG_C = 2; // 0010
  FLAG_D = 1; // 0001

  nRows = 4;
  nColumns = 4;

  kmapEvaluations: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  kmapIDs: number[][] = [[], [], [], []];

  evaluateExpression(): Boolean {
    let a_var: Boolean;
    let b_var: Boolean;
    let c_var: Boolean;
    let d_var: Boolean;
    let evaluation: Boolean;

    const parser = this.parserService.getParser();
    const query = this.parserService.getQuery();
    let expr;
    try {
      expr = parser.parse(query);
      for (let i in this.kmapIDs) {
        for (let j in this.kmapIDs[i]) {
          let dec_number = this.kmapIDs[i][j];
          a_var = !!(dec_number & this.FLAG_A);
          b_var = !!(dec_number & this.FLAG_B);
          c_var = !!(dec_number & this.FLAG_C);
          d_var = !!(dec_number & this.FLAG_D);
          evaluation = expr.evaluate({ A: a_var, B: b_var, C: c_var, D: d_var });
          this.kmapEvaluations[i][j] = (evaluation) ? 1 : 0;
        }
      }
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  constructor(private parserService: ParserService) { }

  ngOnInit() {
    this.evaluateExpression();

    const binaries = ['00', '01', '11', '10'];
    for (let i in binaries) {
      for (let j in binaries) {
        this.kmapIDs[i][j] = parseInt(binaries[i] + binaries[j], 2);
      }
    }

  }

  // check if a group of cells starting at [off_row][off_col] spanning to [off_row+ran_row][off_col+ran_col] is a valid group, i.e.
  // all cells in a group evaluate the expression to true
  checkGroup(offRow: number, offCol: number, rangeRow: number, rangeCol: number): boolean {
    let isValid = true;
    for (let i = offRow; i < offRow + rangeRow; i++) {
      for (let j = offCol; j < offCol + rangeCol; j++) {
        if (this.kmapEvaluations[i % this.nRows][j % this.nColumns] == 0) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  markGroup(group: number[][], offRow: number, offCol: number, rangeRow: number, rangeCol: number): number[][] {
    for (let i = offRow; i < offRow + rangeRow; i++) {
      for (let j = offCol; j < offCol + rangeCol; j++) {
        group[i % this.nRows][j % this.nColumns] = 0;
      }
    }
    return group;
  }

  findBestGroups(): number[][] {
    let markedKMap = this.kmapEvaluations.slice();
    let bestGroups: number[][];

    // Check 16x
    if (this.checkGroup(0, 0, 4, 4)) {
      bestGroups.push([0, 0, 4, 4]);
    }

    // Check 8x
    for (let i = 0 ; i < this.nRows; i++) {
      this.checkGroup(i, 0, 2, 4);
    }
    for (let j; j < this.nColumns; j++) {
      this.checkGroup(0, j, 4, 2);
    }

    return bestGroups;
  }

}
