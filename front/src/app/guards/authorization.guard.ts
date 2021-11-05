import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizationConfig } from '../interfaces/authorization-config';
import { AuthorizationService } from '../services/authorization.service';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authorizationService: AuthorizationService,
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
    return this.authorizationService.getAuthConfig().pipe(
      map((authConfig: AuthorizationConfig) => {
        if (
          !this.authorizationService.isAuthorized(state.url, authConfig.path)
        ) {
          this.router.navigateByUrl('/403');
          return false;
        }
        return true;
      })
    );
  }
}
