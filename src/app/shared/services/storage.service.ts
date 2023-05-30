import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, timeout } from 'rxjs';
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
      tap(console.log),
      timeout(15000),
      catchError(() => of({limit: 0, skip: 0, total: 0, users: []}))
    );
    return this.http.get<{limit: number;skip: number;total: number;users: IUser[];}>('https://dummyjson.com/users').pipe(
      tap(console.log),
      timeout(15000),
      catchError(() => of({limit: 0, skip: 0, total: 0, users: []}))
    );
  }

}
