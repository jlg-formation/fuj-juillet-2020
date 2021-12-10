import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AuthorizationConfig,
  BlackAndWhiteList,
  Specifier,
  SpecifierObject,
} from '../interfaces/authorization-config';
import { UserService } from './user.service';

function whiteListFilter(value: string, whiteList: Specifier[] | undefined) {
  if (!whiteList) {
    return true;
  }
  for (const specifier of whiteList) {
    if (typeof specifier === 'string') {
      if (value === specifier) {
        return true;
      }
    }

    const specifierObject = specifier as SpecifierObject;

    if (specifierObject.type === 'regexp') {
      if (value.match(specifierObject.path)) {
        return true;
      }
    }
  }
  return false;
}

function blackListFilter(value: string, blackList: Specifier[] | undefined) {
  if (!blackList) {
    return true;
  }
  for (const specifier of blackList) {
    if (typeof specifier === 'string') {
      if (value === specifier) {
        return false;
      }
    }

    const specifierObject = specifier as SpecifierObject;

    if (specifierObject.type === 'regexp') {
      if (value.match(specifierObject.path)) {
        return false;
      }
    }
  }
  return true;
}

const isAuthorized = (value: string, bwList: BlackAndWhiteList): boolean => {
  return (
    whiteListFilter(value, bwList.whiteList) &&
    blackListFilter(value, bwList.blackList)
  );
};

const doNotAllowAnythingConfig: AuthorizationConfig = {
  path: { whiteList: [] },
  privilege: { whiteList: [] },
};

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private authConfig: AuthorizationConfig | undefined;
  private authConfig$ = new Subject<AuthorizationConfig>();

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.user$.subscribe({
      next: (user) => {
        if (!user) {
          this.authConfig = undefined;
          return;
        }
        this.http
          .get<AuthorizationConfig>(
            `/api/authz/config/${user.identityProvider}/${user.id}`
          )
          .subscribe({
            next: (authConfig) => {
              this.authConfig = authConfig;
              this.authConfig$.next(authConfig);
            },
            error: (err) => {
              this.authConfig = doNotAllowAnythingConfig;
            },
          });
      },
    });
  }

  can(privilege: string): Observable<boolean> {
    return this.getAuthConfig().pipe(
      map((authzConfig) => {
        return isAuthorized(privilege, authzConfig.privilege);
      })
    );
  }

  canGoToPath(path: string): Observable<boolean> {
    return this.getAuthConfig().pipe(
      map((authzConfig) => {
        return isAuthorized(path, authzConfig.path);
      })
    );
  }

  getAuthConfig(): Observable<AuthorizationConfig> {
    if (this.authConfig) {
      return of(this.authConfig);
    }
    return this.authConfig$;
  }
}
