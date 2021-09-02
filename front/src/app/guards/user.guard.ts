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
    console.log('guard start');
    this.userService.checkConnection(true);
    return this.userService.user$.pipe(
      map((user) => {
        console.log('test passed: is connected: ', user);
        if (!user) {
          console.log('not connected');
          this.router.navigateByUrl('/user/login');
          return false;
        }
        return true;
      })
    );
  }
}