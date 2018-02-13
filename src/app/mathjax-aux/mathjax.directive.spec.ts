import { MathjaxDirective } from './mathjax.directive';
import {ElementRef} from '@angular/core';

describe('MathjaxDirective', () => {
  it('should create an instance', () => {
    const directive = new MathjaxDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
