export class MathJaxConverter {
  static andRep = /and/gi;
  static orRep = /or/gi;
  static notRep = /not/gi;
  static iffRep = /iff|<=>/gi;
  static ifThenRep = /=>/gi;
  static trueRep = /1/gi;
  static falseRep = /0/gi;

  static toMathJax(expression: string): string {
    expression = expression.replace(MathJaxConverter.andRep, '\\land');
    expression = expression.replace(MathJaxConverter.orRep, '\\lor');
    expression = expression.replace(MathJaxConverter.notRep, '\\neg');
    expression = expression.replace(MathJaxConverter.iffRep, '\\iff');
    expression = expression.replace(MathJaxConverter.ifThenRep, '\\implies');
    expression = expression.replace(MathJaxConverter.trueRep, '\\top');
    expression = expression.replace(MathJaxConverter.falseRep, '\\bot');

    return `\\( ${expression}\\)`;
  }

  static toBrowserText(expression: string): string {
    expression = expression.replace(MathJaxConverter.andRep, '&and;');
    expression = expression.replace(MathJaxConverter.orRep, '&or;');
    expression = expression.replace(MathJaxConverter.notRep, '&not;');
    expression = expression.replace(MathJaxConverter.iffRep, '&hArr;');
    expression = expression.replace(MathJaxConverter.ifThenRep, '&rArr;');
    expression = expression.replace(MathJaxConverter.trueRep, '&#8868');
    expression = expression.replace(MathJaxConverter.falseRep, '&perp;');

    return expression;
  }

}
