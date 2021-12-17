import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Oauth2Config {
  [provider: string]: {
    authorizationUrl: string;
    clientId: string;
    redirectUri: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Oauth2Service {
  config$ = new BehaviorSubject<Oauth2Config | undefined>(
    this.getOfflineConfig()
  );

  constructor(private http: HttpClient, private userService: UserService) {
    this.syncOfflineConfig();
    (async () => {
      try {
        await lastValueFrom(this.userService.setAfterLoginRoute('/'));
        const config = await lastValueFrom(
          this.http.get<Oauth2Config>('/api/oauth2/config').pipe(delay(500))
        );
        this.config$.next(config);
      } catch (err) {
        console.log('cannot setup the auth2 service: ', err);
        if (err instanceof HttpErrorResponse) {
          const config = this.getOfflineConfig();
          this.config$.next(config);
        }
      }
    })();
  }

  syncOfflineConfig() {
    this.config$.subscribe((config) => {
      localStorage.setItem('oauth2Config', JSON.stringify(config));
    });
  }

  getOfflineConfig(): Oauth2Config | undefined {
    try {
      const str = localStorage.getItem('oauth2Config');
      if (!str) {
        return undefined;
      }
      const config = JSON.parse(str) as Oauth2Config;
      return config;
    } catch (err) {
      return undefined;
    }
  }

  getAuthorizeUrl(provider: string) {
    const config = this.config$.value;
    if (!config) {
      return '';
    }
    const providerConfig = config[provider];
    if (!providerConfig) {
      return '';
    }

    const result = providerConfig.authorizationUrl;
    return result;
  }
}
