import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariablesService {
  private _CNF = 0;
  private _DNF = 1;

  constructor() { }

  get CNF(): number {
    return this._CNF;
  }

  get DNF(): number {
    return this._DNF;
  }
}
