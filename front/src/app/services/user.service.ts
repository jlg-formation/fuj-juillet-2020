import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<User | undefined>(this.getOfflineUser());

  constructor(private http: HttpClient) {
    this.syncOfflineUser();
    this.isConnected().subscribe();
  }

  disconnect(): Observable<void> {
    this.user$.next(undefined);
    return this.http.post<void>('/api/auth/disconnect', undefined);
  }

  getOfflineUser(): User | undefined {
    try {
      const str = localStorage.getItem('user');
      if (!str) {
        return undefined;
      }
      const user = JSON.parse(str) as User;
      if (!user.displayName) {
        return undefined;
      }
      return user;
    } catch (err) {
      return undefined;
    }
  }

  isConnected(): Observable<User | undefined> {
    return this.http.get<User | undefined>('/api/auth/isConnected').pipe(
      map((u) => {
        console.log('isConnected user body', u);
        return u || undefined;
      }),
      catchError((err) => {
        console.log('err: ', err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return of(undefined);
          }
          // other errors means no clear answer from the server.
          // consider we are offline
          const user = this.getOfflineUser();
          console.log('offline user: ', user);
          return of(user);
        }
        return of(undefined);
      }),
      tap((u) => {
        if (!u && !this.user$.value) {
          return;
        }
        if (u && JSON.stringify(u) === JSON.stringify(this.user$.value)) {
          return;
        }
        this.user$.next(u);
      })
    );
  }

  setAfterLoginRoute(path: string): Observable<void> {
    const url = window.location.origin + path;
    return this.http.post<void>('/api/auth/afterLoginRoute', { url }).pipe(
      tap({
        error: (err) => {
          console.log('err: ', err);
        },
      })
    );
  }

  syncOfflineUser() {
    this.user$.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
