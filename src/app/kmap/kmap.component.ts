import { Component, OnInit } from '@angular/core';
import * as Parser from 'expr-eval';
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
  kmap_evals: number[] = [];

  kmap_evals_matrix: number[][] = [[], [], [], []];
  kmap_binary: number[][] = [[], [], [], []];

  evaluate_expr(): Boolean {
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
      for (let i = 0; i < 16; i++) {
        a_var = !!(i & this.FLAG_A);
        b_var = !!(i & this.FLAG_B);
        c_var = !!(i & this.FLAG_C);
        d_var = !!(i & this.FLAG_D);
        evaluation = expr.evaluate({ A: a_var, B: b_var, C: c_var, D: d_var });
        this.kmap_evals[i] = (evaluation) ? 1 : 0;
        console.log('For ' + i + ' (' + i.toString(2) + ')' + ' expression is ' + evaluation);
      }

      for (let i in this.kmap_binary) {
        for (let j in this.kmap_binary[i]) {
          let dec_number = this.kmap_binary[i][j];
          a_var = !!(dec_number & this.FLAG_A);
          b_var = !!(dec_number & this.FLAG_B);
          c_var = !!(dec_number & this.FLAG_C);
          d_var = !!(dec_number & this.FLAG_D);
          evaluation = expr.evaluate({ A: a_var, B: b_var, C: c_var, D: d_var });
          this.kmap_evals_matrix[i][j] = (evaluation) ? 1 : 0;
        }
      }

    } catch (err) {
      console.log(err);
    }

    return false;
  }

  constructor(private parserService: ParserService) { }

  ngOnInit() {
    this.evaluate_expr();

    const binaries = ['00', '01', '11', '10'];
    for (let i in binaries) {
      for (let j in binaries) {
        this.kmap_binary[i][j] = parseInt(binaries[i] + binaries[j], 2);
        console.log('[', i, '][', j, '] = ', this.kmap_binary[i][j]);
      }
    }

  }

  kmap_value(cell_id: string): number {
    const cell_id_number = parseInt(cell_id, 2);
    return this.kmap_evals[cell_id_number];
  }

  bin_to_dec(binary: string): number {
    const decimal = parseInt(binary, 2);
    return decimal;
  }

}
