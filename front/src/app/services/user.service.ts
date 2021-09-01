import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.checkConnection(false);
  }

  checkConnection(isLazy = false): void {
    if (isLazy && this.user$.value) {
      return;
    }

    this.http
      .get<User | undefined>('/api/auth/isConnected')
      .pipe(
        map((u) => {
          console.log('isConnected user body', u);
          return u || undefined;
        }),
        catchError((err) => of(undefined))
      )
      .subscribe({
        next: (user) => {
          this.user$.next(user);
        },
      });
  }
}
