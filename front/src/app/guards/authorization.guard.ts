import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthorizationConfig } from '../interfaces/authorization-config';
import { UserService } from './../services/user.service';

function isAuthorized(path: string, authzConfig: AuthorizationConfig): boolean {
  return false;
}

const authorize = (
  path: string,
  authzConfig: AuthorizationConfig,
  router: Router
) => {
  if (!isAuthorized(path, authzConfig)) {
    router.navigateByUrl('/403');
    return false;
  }
  return true;
};

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  authConfig!: AuthorizationConfig;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authConfig) {
      // we need to wait to have the authzConfig to answer.
      return this.userService.user$.pipe(
        switchMap((user) => {
          return this.http.get<AuthorizationConfig>(
            `/api/authz/config/${user?.id}`
          );
        }),
        map((authConfig: AuthorizationConfig) => {
          this.authConfig = authConfig;
          return authorize(state.url, authConfig, this.router);
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.router.navigateByUrl('/403');
          return of(false);
        })
      );
    }
    return authorize(state.url, this.authConfig, this.router);
  }
}
