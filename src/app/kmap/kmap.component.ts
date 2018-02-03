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

  kmapIDs: number[][] = [[], [], [], []];

  kmapEvaluations: number[][];
  bestGroups: number[][];

  constructor(private parserService: ParserService) { }

  ngOnInit() {
    this.kmapEvaluations = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    const binaries = ['00', '01', '11', '10'];
    for (let i in binaries) {
      for (let j in binaries) {
        this.kmapIDs[i][j] = parseInt(binaries[i] + binaries[j], 2);
      }
    }
  }

  onClick() {
    let kmapMarked = this.evaluateExpression();         // essentially kmapMarked is a copy of this.kmapEvaluations
    this.bestGroups = this.findBestGroups(kmapMarked);  // but operating directly on the class property caused some asynchronous issues
  }

  evaluateExpression(): number[][] {
    let a_var: Boolean;
    let b_var: Boolean;
    let c_var: Boolean;
    let d_var: Boolean;
    let evaluation: Boolean;

    let markedKmap: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

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
          let evaluationNumber = (evaluation) ? 1 : 0;
          this.kmapEvaluations[i][j] = evaluationNumber;
          markedKmap[i][j] = evaluationNumber;
        }
      }
    } catch (err) {
      console.log(err);
    }

    return markedKmap;
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

  checkMarked(group: number[][], offRow: number, offCol: number, rangeRow: number, rangeCol: number): boolean {
    let hasUngrouped = false;
    for (let i = offRow; i < offRow + rangeRow; i++) {
      for (let j = offCol; j < offCol + rangeCol; j++) {
        if (group[i % this.nRows][j % this.nColumns] == 1) {
          hasUngrouped = true;
          break;
        }
      }
    }
    return hasUngrouped;
  }

  checkPushMark(pair: {markedArray: number[][], bestArray: number[][]},
                offRow: number, offCol: number, rangeRow: number, rangeCol: number) {

    // console.log('checkPushMark for', offRow, offCol, rangeRow, rangeCol);

    if (this.checkGroup(offRow, offCol, rangeRow, rangeCol)
        && this.checkMarked(pair.markedArray, offRow, offCol, rangeRow, rangeCol)) {

      // console.log('Got here');

      pair.bestArray.push([offRow, offCol, rangeRow, rangeCol]);
      pair.markedArray = this.markGroup(pair.markedArray, offRow, offCol, rangeRow, rangeCol);
    }

    return pair;
  }

  findBestGroups(kmapMarked: number[][]): number[][] {
    let bestGroups: number[][] = [];

    // Check 16x
    this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, 0, 0, 4, 4);

    // Check 8x
    for (let i = 0 ; i < this.nRows; i++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, 0, 2, 4);
    }
    for (let j; j < this.nColumns; j++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, 0, j, 4, 2);
    }

    // Check 4x
    for (let i = 0 ; i < this.nRows; i++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, 0, 1, 4);
    }
    for (let j; j < this.nColumns; j++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, 0, j, 4, 1);
    }
    for (let i = 0 ; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, j, 2, 2);

    // Check 2x
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, j, 1, 2);
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, j, 2, 1);

    // Check 1x
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, i, j, 1, 1);
      }
    }

    return bestGroups;
  }

}
