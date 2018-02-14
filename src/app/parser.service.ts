import { Injectable } from '@angular/core';
import { Parser, Expression } from 'expr-eval';

@Injectable()
export class ParserService {
  parser: Parser;
  query: string;

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

  setQuery(query) {
    this.query = query;
  }

  getQuery(): string {
    return this.query;
  }

  getParser(): Parser {
    return this.parser;
  }

  // get position of n'th (index) subString in string
  getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

  preParse(query: string): string {
    let iffRep = / iff /gi;
    query = query.replace(iffRep, ' <=> ');

    let openBrackets: number[] = [];

    let firstTermStart;
    let firstTermEnd;
    let secondTermStart;
    let secondTermEnd = query.length;

    let found = false;

    for (let i = 0; i < query.length; i++) {
      console.log('L');
      if (query.charAt(i) == '(') {
        openBrackets.push(i);
      }

      if (query.charAt(i) == ')') {
        if (found && openBrackets[openBrackets.length - 1] == firstTermStart - 1) {
          secondTermEnd = i;
          break;
        }
        openBrackets.pop();
      }

      if ((query.substr(i, 5) == ' <=> ')) {
        if (!found) {
          found = true;
          firstTermEnd = i;
          secondTermStart = i + 5;

          console.log('i: ', i);
          console.log('char: ', query.charAt(i));
          console.log('openBrackets: ', openBrackets);
          console.log('openBrackets.length: ', openBrackets.length);
          if (openBrackets.length > 0) {
            firstTermStart = openBrackets[openBrackets.length - 1] + 1;
          } else {
            // since IFF is the weakest logical operation everything before <=> has to be executed first
            firstTermStart = 0;
          }
          // ' <=> ' ahead but already found one
        } else {
          if (openBrackets.length == 0 || openBrackets[openBrackets.length - 1] == firstTermStart - 1) {
            secondTermEnd = i;
          }
        }
      }
    }

    // After scanning
    if (!found) {
      return query;
    } else {

      // non-matching bracket will cause secondTermEnd have no value
      if (secondTermEnd == undefined) {
        console.log('Non-matching brackets');
        throw new SyntaxError();
      }

      let beforeTerm = query.substring(0, firstTermStart);
      let firstTerm = query.substring(firstTermStart, firstTermEnd);
      let secondTerm = query.substring(secondTermStart, secondTermEnd);
      let afterTerm = query.substring(secondTermEnd);

      // if a term on any side is empty, throw an error
      if (firstTerm == '' || secondTerm == '') {
        console.log('Empty expression on one of the sides');
        throw new SyntaxError();
      }

      // DEBUG
      console.log('After resolving');
      console.log('firsTermStart: ', firstTermStart);
      console.log('firsTermEnd: ', firstTermEnd);
      console.log('secondTermStart: ', secondTermStart);
      console.log('secondTermEnd: ', secondTermEnd);
      console.log('before: ', beforeTerm);
      console.log('first term: ', firstTerm);
      console.log('second term: ', secondTerm);
      console.log('after: ', afterTerm);

      console.log('Starting recursion on');
      let iffModifiedString =
        beforeTerm +
        '(((' + firstTerm + ') and (' + secondTerm + '))' +
        ' or ' +
        '(not (' + firstTerm + ') and not (' + secondTerm + ')))' +
        afterTerm;

      console.log(iffModifiedString);
      return this.preParse(iffModifiedString);
    }
  }

}
