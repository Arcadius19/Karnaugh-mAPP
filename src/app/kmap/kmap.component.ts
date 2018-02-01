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

  n_rows = 4;
  n_columns = 4;

  kmap_evals_matrix: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
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
      }
    }

  }

  bin_to_dec(binary: string): number {
    const decimal = parseInt(binary, 2);
    return decimal;
  }

  // check if a group of cells starting at [off_row][off_col] spanning to [off_row+ran_row][off_col+ran_col] is a valid group, i.e.
  // all cells in a group evaluate the expression to true
  check_group(off_row: number, off_col: number, ran_row: number, ran_col, number): boolean {
    let is_valid = true;
    for (let i = off_row; i < off_row + ran_row; i++) {
      for (let j = off_col; j < off_col + ran_col; j++) {
        if (this.kmap_evals_matrix[i % this.n_rows][j % this.n_columns] == 0) {
          is_valid = false;
          break;
        }
      }
    }
    return is_valid;
  }

}
