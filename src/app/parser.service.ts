import { Injectable } from '@angular/core';
import { Parser, Expression } from 'expr-eval';

@Injectable()
export class ParserService {
  parser: Parser;
  query: string;

  setQuery(query) {
    this.query = query;
  }

  getQuery(): string {
    return this.query;
  }

  getParser(): Parser {
    return this.parser;
  }

  constructor() {
    this.parser = new Parser({operators: {
        add: false,
        concatenate: false,
        conditional: true,
        divide: false,
        factorial: false,
        multiply: false,
        power: false,
        remainder: false,
        subtract: false,
        logical: true,
        comparison: false
    }});

    this.query = '';
  }

}
