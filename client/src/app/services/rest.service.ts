import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Rest } from '../types/rest'

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseurl = 'http://192.168.1.46:8000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getArtists(): Observable<Rest> {
    return this.http
      .get<Rest>(this.baseurl + '/artists/')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAlbums(): Observable<Rest> {
    return this.http
      .get<Rest>(this.baseurl + '/album/')
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getSongs(): Observable<Rest> {
    return this.http
      .get<Rest>(this.baseurl + '/song/')
      .pipe(retry(1), catchError(this.errorHandl));
  }


  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
