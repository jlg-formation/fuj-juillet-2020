import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('guard start for state.url', state.url);
    if (this.userService.user$.value) {
      return true;
    }

    return this.userService.isConnected().pipe(
      switchMap(async (user) => {
        console.log('test passed: is connected: ', user);
        if (!user) {
          console.log('not connected');
          await lastValueFrom(this.userService.setAfterLoginRoute(state.url));
          await this.router.navigateByUrl('/user/login');
          return false;
        }
        return true;
      })
    );
  }
}
