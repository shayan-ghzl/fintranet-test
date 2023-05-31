import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, of, timeout } from 'rxjs';
import { IUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<{limit: number;skip: number;total: number;users: IUser[];}>('./assets/fake-api/users.json', { responseType: 'json' }).pipe(
      delay(1000),
      timeout(16000),
      catchError(() => of({limit: 0, skip: 0, total: 0, users: []}))
    );
    return this.http.get<{limit: number;skip: number;total: number;users: IUser[];}>('https://dummyjson.com/users').pipe(
    delay(1000),
      timeout(16000),
      catchError(() => of({limit: 0, skip: 0, total: 0, users: []}))
    );
  }

}
