import { UserService } from './../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthorizationConfig } from '../interfaces/authorization-config';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  authConfig$ = new BehaviorSubject<AuthorizationConfig>({});
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.user$.subscribe({
      next: (user) => {
        this.http.get('/api/authz/config').subscribe({
          next: (authConfig: AuthorizationConfig) => {
            this.authConfig$.next(authConfig);
          },
        });
      },
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO: get the authorization right for the given user (anonymous included).
    //
    return true;
  }
}
