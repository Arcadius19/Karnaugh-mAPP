export class MathJax {

  static toMathJax(expression: string): string {
    let andRep = /and/gi;
    let orRep = /or/gi;
    let notRep = /not/gi;
    let trueRep = /1/gi;
    let falseRep = /0/gi;

    expression = expression.replace(andRep, '\\land');
    expression = expression.replace(orRep, '\\lor');
    expression = expression.replace(notRep, '\\neg');
    expression = expression.replace(trueRep, '\\top');
    expression = expression.replace(falseRep, '\\neg');

    return `\\( ${expression}\\)`;
  }

}
