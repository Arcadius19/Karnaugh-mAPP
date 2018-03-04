import { Component, OnInit } from '@angular/core';
import { ParserService } from '../../auxiliary/parser.service';
import { ExpressionGroup } from './expression-group-old';
import { GridGroup } from '../../auxiliary/grid-group';
import {GlobalVariablesService} from '../../auxiliary/global-variables.service';
import {KarnaughMap} from '../../auxiliary/karnaugh-map';
import {BestGroupsSolver} from '../../auxiliary/best-groups-solver';

@Component({
  selector: 'app-kmap',
  templateUrl: './kmap.component.html',
  styleUrls: ['./kmap.component.css'],
})
export class KmapComponent implements OnInit {
  kmapType = 1;

  nRows = 4;
  nColumns = 4;

  kmapIDs: number[][];

  kmapEvaluations: number[][];
  highlightedKmap: boolean[][];
  dnfGroups: GridGroup[];
  cnfGroups: GridGroup[];

  constructor(private parserService: ParserService,
              private globalVariables: GlobalVariablesService) { }

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
    this.kmapEvaluations = (new KarnaughMap(4)).evaluate(this.parserService.getQuery());
    this.dnfGroups = BestGroupsSolver.findBestGroups(this.kmapEvaluations, true)[0].map(group => group.toGridGroup(4));
    this.cnfGroups = BestGroupsSolver.findBestGroups(this.kmapEvaluations, false)[0].map(group => group.toGridGroup(4));
  }

  highlightGroup(gridGroup: GridGroup) {
    let cellsInGroup: number[] = [];
    for (let i = gridGroup.offRow; i < gridGroup.offRow + gridGroup.rangeRow; i++) {
      for (let j = gridGroup.offCol; j < gridGroup.offCol + gridGroup.rangeCol; j++) {
        this.highlightedKmap[i % this.nRows][j % this.nRows] = !this.highlightedKmap[i % this.nRows][j % this.nRows];
      }
    }
  }

  toExpressionGroup(gridGroup: GridGroup): string {
    return ExpressionGroup.toWholeSolution([ExpressionGroup.parseGridGroup(gridGroup)]);
  }

  displayWholeSolution(dnfType = true): string {
    if (dnfType) {
      if (this.dnfGroups != undefined && this.dnfGroups.length > 0) {
        return ExpressionGroup.toWholeSolution(this.dnfGroups.map(ExpressionGroup.parseGridGroup), dnfType);
      }
    } else {
      if (this.cnfGroups != undefined && this.cnfGroups.length > 0) {
        return ExpressionGroup.toWholeSolution(this.cnfGroups.map(ExpressionGroup.parseGridGroup), dnfType);
      }
    }
    return '';
  }

  onClickDebug(gridGroup: GridGroup) {
    let temp1 = ExpressionGroup.parseGridGroup(gridGroup);
    let temp1Cells = temp1.findCells();
    let temp1BackToGrid = temp1.toGridGroup();
    console.log('Expression cells: ', temp1Cells);
    console.log('Back to Grid: ', temp1BackToGrid);
  }

  onTypeChange(kmapType: number) {
    this.kmapType = kmapType;
  }

}
