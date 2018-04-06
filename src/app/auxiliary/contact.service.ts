import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Feedback} from './feedback';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post('/api/feedback', JSON.stringify(feedback), httpOptions)
      .pipe(catchError(this.handleError));
  }

  sendUserTestingResponse(utResponse: any): Observable<any> {
    return this.http.post('/api/user-testing', JSON.stringify(utResponse), httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Adapted from https://angular.io/guide/http#error-handling
  private handleError(error: HttpErrorResponse | any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Server returned code ${error.status}, with a message: ${error.message}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable( error.error);
  }

}
