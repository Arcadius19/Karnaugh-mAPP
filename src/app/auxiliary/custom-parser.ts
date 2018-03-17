import { Parser } from 'expr-eval';

export class CustomParser {
  static PARSER;

  static initilize() {
    this.PARSER = new Parser({operators: {
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
  }

  static preParse(query: string): string {
    let parsedQuery = CustomParser.iffParse(query);
    parsedQuery = CustomParser.ifThenParse(parsedQuery);

    return parsedQuery;
  }

  static iffParse(query: string): string {
    let iffRep = / iff /gi;
    query = query.replace(iffRep, ' <=> ');

    let openBrackets: number[] = [];

    let firstTermStart;
    let firstTermEnd;
    let secondTermStart;
    let secondTermEnd = query.length;

    let found = false;

    for (let i = 0; i < query.length; i++) {
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
            break;
          }
        }
      }
    }

    // After scanning
    if (!found) {
      return query;
    } else {

      let beforeTerm = query.substring(0, firstTermStart);
      let firstTerm = query.substring(firstTermStart, firstTermEnd);
      let secondTerm = query.substring(secondTermStart, secondTermEnd);
      let afterTerm = query.substring(secondTermEnd);

      // if a term on any side is empty, throw an error
      if (firstTerm == '' || secondTerm == '') {
        throw new SyntaxError('Empty expression on one of the sides');
      }

      let iffModifiedString =
        beforeTerm +
        '(((' + firstTerm + ') and (' + secondTerm + '))' +
        ' or ' +
        '(not (' + firstTerm + ') and not (' + secondTerm + ')))' +
        afterTerm;

      return this.preParse(iffModifiedString);
    }
  }

  static ifThenParse(query: string): string {
    let openBrackets: number[] = [];

    let firstTermStart = 0;
    let firstTermEnd;
    let secondTermStart;
    let secondTermEnd = query.length;

    let lastIff = 0;
    let found = false;

    for (let i = 0; i < query.length; i++) {
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

      if (query.substr(i, 4) == ' => ') {
        if (!found) {
          found = true;
          firstTermEnd = i;
          secondTermStart = i + 4;

          if (openBrackets.length > 0 && lastIff - 1 < openBrackets[openBrackets.length - 1]) {
            firstTermStart = openBrackets[openBrackets.length - 1] + 1;
          } else {
            firstTermStart = lastIff;
          }

        } else {
          if (openBrackets.length == 0 || openBrackets[openBrackets.length - 1] == firstTermStart - 1) {
            secondTermEnd = i;
            break;
          }
        }
      }

      if (query.substr(i, 5) == ' <=> ') {
        if (!found) {
          lastIff = i + 5;
        } else {
          secondTermEnd = i;
          break;
        }
      }
    }

    // After scanning
    if (!found) {
      return query;
    } else {

      let beforeTerm = query.substring(0, firstTermStart);
      let firstTerm = query.substring(firstTermStart, firstTermEnd);
      let secondTerm = query.substring(secondTermStart, secondTermEnd);
      let afterTerm = query.substring(secondTermEnd);

      // if a term on any side is empty, throw an error
      if (firstTerm == '' || secondTerm == '') {
        throw new SyntaxError('Empty expression on one of the sides');
      }

      let ifThenModifiedString =
        beforeTerm +
        '(not (' + firstTerm + ') or (' + secondTerm + '))' +
        afterTerm;

      return this.preParse(ifThenModifiedString);
    }
  }

}

CustomParser.initilize();
