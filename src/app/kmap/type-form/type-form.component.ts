import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GlobalVariablesService} from '../../global-variables.service';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {
  CNF: number;
  DNF: number;

  kmapTypeOption: number;

  @Output() onTypeChange = new EventEmitter<number>();

  constructor(private globalVariables: GlobalVariablesService) {
    this.CNF = this.globalVariables.CNF;
    this.DNF = this.globalVariables.DNF;
    this.kmapTypeOption = this.DNF;
  }

  ngOnInit() {
  }

  changeKmapType(): void {
    this.onTypeChange.emit(this.kmapTypeOption);
  }

}
