import { Component, OnInit } from '@angular/core';
import { ParserService } from '../parser.service';
import { ExpressionGroup } from '../expression-group';
import { GridGroup } from '../grid-group';

@Component({
  selector: 'app-kmap',
  templateUrl: './kmap.component.html',
  styleUrls: ['./kmap.component.css'],
})
export class KmapComponent implements OnInit {
  FLAG_A = 8; // 1000
  FLAG_B = 4; // 0100
  FLAG_C = 2; // 0010
  FLAG_D = 1; // 0001

  nRows = 4;
  nColumns = 4;

  kmapIDs: number[][];

  kmapEvaluations: number[][];
  bestGroups: GridGroup[];
  highlightedKmap: boolean[][];

  mathString = '$$ x = \\sqrt{2} $$';

  constructor(private parserService: ParserService) { }

  ngOnInit() {
    this.kmapEvaluations = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.kmapIDs = [[], [], [], []];
    this.highlightedKmap = [[false, false, false, false], [false, false, false, false],
      [false, false, false, false], [false, false, false, false]];

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
    let aVar: Boolean;
    let bVar: Boolean;
    let cVar: Boolean;
    let dVar: Boolean;
    let evaluation: Boolean;

    let markedKmap: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    const parser = this.parserService.getParser();
    const query = this.parserService.getQuery();
    let expression;
    try {
      expression = parser.parse(query);
      for (let i in this.kmapIDs) {
        for (let j in this.kmapIDs[i]) {
          let decimalNumber = this.kmapIDs[i][j];
          aVar = !!(decimalNumber & this.FLAG_A);
          bVar = !!(decimalNumber & this.FLAG_B);
          cVar = !!(decimalNumber & this.FLAG_C);
          dVar = !!(decimalNumber & this.FLAG_D);
          evaluation = expression.evaluate({ A: aVar, B: bVar, C: cVar, D: dVar });
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

  findBestGroups(kmapMarked: number[][]): GridGroup[] {
    let bestGroups: GridGroup[] = [];

    // Check 16x
    this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(0, 0, 4, 4));

    // Check 8x
    for (let i = 0 ; i < this.nRows; i++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, 0, 2, 4));
    }
    for (let j = 0; j < this.nColumns; j++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(0, j, 4, 2));
    }

    // Check 4x
    for (let i = 0 ; i < this.nRows; i++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, 0, 1, 4));
    }
    for (let j = 0; j < this.nColumns; j++) {
      this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(0, j, 4, 1));
    }
    for (let i = 0 ; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, j, 2, 2));
      }
    }

    // Check 2x
    for (let i = 0 ; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, j, 1, 2));
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, j, 2, 1));
      }
    }

    // Check 1x
    for (let i = 0 ; i < this.nRows; i++) {
      for (let j = 0; j < this.nColumns; j++) {
        this.checkPushMark({markedArray: kmapMarked, bestArray: bestGroups}, new GridGroup(i, j, 1, 1));
      }
    }

    let bestGroupExpressions = bestGroups.map(ExpressionGroup.parseGridGroup);
    bestGroupExpressions = ExpressionGroup.findMinimal(bestGroupExpressions);

    return bestGroupExpressions.map(ExpressionGroup.toGridGroup);
  }

  // to return two values, markedArray and bestArray are passed as an object, so they are modified in place
  checkPushMark(pair: {markedArray: number[][], bestArray: GridGroup[]}, gridGroup: GridGroup) {

    if (this.checkGroup(gridGroup) && this.checkMarked(pair.markedArray, gridGroup)) {

      pair.bestArray.push(gridGroup);
      pair.markedArray = this.markGroup(pair.markedArray, gridGroup);
    }

    return pair;
  }

  // check if a group of cells starting at [off_row][off_col] spanning to [off_row+ran_row][off_col+ran_col] is a valid group, i.e.
  // all cells in a group evaluate the expression to true
  checkGroup(gridGroup: GridGroup): boolean {
    let isValid = true;
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        if (this.kmapEvaluations[i % this.nRows][j % this.nColumns] == 0) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  }

  // check if in the following group, there is at least one cell which has not been marked yet
  checkMarked(marked: number[][], gridGroup: GridGroup): boolean {
    let hasUngrouped = false;
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        if (marked[i % this.nRows][j % this.nColumns] == 1) {
          hasUngrouped = true;
          break;
        }
      }
    }
    return hasUngrouped;
  }

  markGroup(marked: number[][], gridGroup: GridGroup): number[][] {
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        marked[i % this.nRows][j % this.nColumns] = 0;
      }
    }
    return marked;
  }

  highlightGroup(gridGroup: GridGroup) {
    let cellsInGroup: number[] = [];
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        this.highlightedKmap[i % this.nRows][j % this.nRows] = !this.highlightedKmap[i % this.nRows][j % this.nRows];
      }
    }
  }

  toExpressionGroup(gridGroup: GridGroup): ExpressionGroup {
    return ExpressionGroup.parseGridGroup(gridGroup);
  }

  onClickDebug(gridGroup: GridGroup) {
    let temp1 = ExpressionGroup.parseGridGroup(gridGroup);
    let temp1Cells = temp1.findCells();
    let temp1BackToGrid = temp1.toGridGroup();
    console.log('Expression cells: ', temp1Cells);
    console.log('Back to Grid: ', temp1BackToGrid);
  }

}
