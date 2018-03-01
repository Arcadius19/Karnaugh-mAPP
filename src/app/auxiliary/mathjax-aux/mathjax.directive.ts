///<reference path="../../../../node_modules/@types/mathjax/index.d.ts"/>
import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appMathJax]',
})
export class MathjaxDirective implements OnChanges {
  @Input() mathString: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.mathString;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement]);
  }

}
