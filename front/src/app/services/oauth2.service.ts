import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  config$ = new BehaviorSubject<Oauth2Config | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.http
      .get<Oauth2Config>('/api/oauth2/config')
      .pipe(delay(500))
      .subscribe({
        next: (config) => {
          this.config$.next(config);
        },
        error: (err) => {
          console.log('err: ', err);
        },
      });
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
