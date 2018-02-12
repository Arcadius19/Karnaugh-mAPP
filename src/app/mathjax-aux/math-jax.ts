export class MathJax {

  static toMathJax(expression: string): string {
    let andRep = /and/gi;
    let orRep = /or/gi;
    let notRep = /not/gi;

    expression = expression.replace(andRep, '\\wedge');
    expression = expression.replace(orRep, '\\vee');
    expression = expression.replace(notRep, '\\neg');

    return `\\( ${expression}\\)`;
  }

}
