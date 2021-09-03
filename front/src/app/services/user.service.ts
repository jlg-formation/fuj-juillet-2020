import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  disconnect(): Observable<void> {
    this.user$.next(undefined);
    return this.http.post<void>('/api/auth/disconnect', undefined);
  }

  setAfterLoginRoute(path: string) {
    const url = window.location.origin + path;
    console.log('url: ', url);
    this.http.post<void>('/api/auth/afterLoginRoute', { url }).subscribe({
      error: (err) => {
        console.error('err: ', err);
      },
    });
  }
}
