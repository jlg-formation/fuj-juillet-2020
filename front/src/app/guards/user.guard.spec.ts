import { LayoutModule } from './../layout/layout.module';
import { UserModule } from './../user/user.module';
import { LoginComponent } from './../user/login/login.component';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { user } from 'src/test/user';

const routes: Routes = [
  {
    path: 'user/login',
    component: LoginComponent,
  },
];

describe('UserGuard', () => {
  let guard: UserGuard;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let userService: UserService;

  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        UserModule,
        LayoutModule,
      ],
    });
    guard = TestBed.inject(UserGuard);
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should test canActivate with no user', () => {
    const canActivateObs = guard.canActivate(route, state);
    const req = http.expectOne('/api/auth/isConnected');
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 401, statusText: 'not authorized' });
    (canActivateObs as Observable<boolean>).subscribe({
      next: (b) => {
        console.log('b: ', b);
      },
    });

    expect(guard).toBeTruthy();
    const req2 = http.expectOne('/api/auth/isConnected');
    expect(req2.request.method).toEqual('GET');
    req2.flush('', { status: 401, statusText: 'not authorized' });
  });

  it('should test canActivate with no user', () => {
    const canActivateObs = guard.canActivate(route, state);
    const req = http.expectOne('/api/auth/isConnected');
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 401, statusText: 'not authorized' });
    (canActivateObs as Observable<boolean>).subscribe({
      next: (b) => {
        console.log('b: ', b);
      },
    });

    expect(guard).toBeTruthy();
    const req2 = http.expectOne('/api/auth/isConnected');
    expect(req2.request.method).toEqual('GET');
    req2.flush(user);
  });

  it('should test canActivate with a user', () => {
    userService.user$.next(user);
    guard.canActivate(route, state);
    expect(guard).toBeTruthy();
  });
});
