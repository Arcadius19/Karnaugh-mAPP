import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParserService } from '../parser.service';
import {MathJax} from '../mathjax-aux/math-jax';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  query: AbstractControl;
  mathText = '\\(\\bot\\)'; // field used for displaying MathJax text beneath the form
  @Output() myEvent = new EventEmitter();

  constructor(fb: FormBuilder, private parserService: ParserService) {
    this.form = fb.group({
      'query': ['', [Validators.required, this.queryValidator.bind(this)]]
    });

    this.query = this.form.controls['query'];
  }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    console.log('Submitted value:', form);
    const query = form.query;
    this.parserService.setQuery(query);
    this.myEvent.emit(null);
    this.toMathJax();
  }

  queryValidator(control: FormControl): { [s: string]: boolean} {
    let query_string = control.value;
    const parser = this.parserService.getParser();
    try {
      query_string = this.parserService.preParse(query_string);
      const expr = parser.parse(query_string);
      return null;
    } catch (err) {
      return {'invalidQuery': true};
    }
  }

  toMathJax() {
    this.mathText = MathJax.toMathJax(this.query.value);
  }

}
