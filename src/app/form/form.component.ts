import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParserService } from '../parser.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  query: AbstractControl;
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
    console.log('You submitted value:', form);
    const query = form.query;
    this.parserService.setQuery(query);
    this.myEvent.emit(null);
  }

  queryValidator(control: FormControl): { [s: string]: boolean} {
    const query_string = control.value;
    const parser = this.parserService.getParser();
    try {
      const expr = parser.parse(query_string);
      console.log(query_string, ' gives ');
      console.log('Valid query', expr.evaluate({A: 1, B: 1, C: 1, D: 1}));
      return null;
    } catch (err) {
      // console.log('Invalid query', err);
      return {'invalidQuery': true};
    }
  }

}
