import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CompletionExUpdateService {
  private completionDeleteSource = new Subject<{exID: number, qID: number}>();
  private uncompleteAllSource = new Subject<boolean>();

  completionDelete$ = this.completionDeleteSource.asObservable();
  uncompleteAll$ = this.uncompleteAllSource.asObservable();

  removeCompletion(exID: number, qID: number) {
    this.completionDeleteSource.next({exID: exID, qID: qID});
  }

  removeAllCompletes() {
    this.uncompleteAllSource.next(true);
  }

}
