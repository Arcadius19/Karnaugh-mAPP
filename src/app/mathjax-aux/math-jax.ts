export class MathJax {
  static andRep = /and/gi;
  static orRep = /or/gi;
  static notRep = /not/gi;
  static iffRep = /iff|<=>/gi;
  static ifThenRep = /=>/gi;
  static trueRep = /1/gi;
  static falseRep = /0/gi;

  static toMathJax(expression: string): string {
    expression = expression.replace(MathJax.andRep, '\\land');
    expression = expression.replace(MathJax.orRep, '\\lor');
    expression = expression.replace(MathJax.notRep, '\\neg');
    expression = expression.replace(MathJax.iffRep, '\\iff');
    expression = expression.replace(MathJax.ifThenRep, '\\implies');
    expression = expression.replace(MathJax.trueRep, '\\top');
    expression = expression.replace(MathJax.falseRep, '\\neg');

    return `\\( ${expression}\\)`;
  }

  static toBrowserText(expression: string): string {
    expression = expression.replace(MathJax.andRep, '&and;');
    expression = expression.replace(MathJax.orRep, '&or;');
    expression = expression.replace(MathJax.notRep, '&not;');
    expression = expression.replace(MathJax.iffRep, '&hArr;');
    expression = expression.replace(MathJax.ifThenRep, '&rArr;');
    expression = expression.replace(MathJax.trueRep, '&#8868');
    expression = expression.replace(MathJax.falseRep, '&perp;');

    return expression;
  }

}
