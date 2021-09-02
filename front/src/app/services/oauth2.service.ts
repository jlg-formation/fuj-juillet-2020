import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

export interface Oauth2Config {
  [provider: string]: {
    authorizationUrl: string;
    clientId: string;
    redirectUri: string;
  };
}

function getHost() {
  const url = window.location.href;
  const arr = url.split('/');
  const result = arr[0] + '//' + arr[2];
  return result;
}

const host = getHost();
console.log('host: ', host);

@Injectable({
  providedIn: 'root',
})
export class Oauth2Service {
  config$ = new BehaviorSubject<Oauth2Config | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.http
      .get<Oauth2Config>('/api/oauth/config')
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

  getConnectUrl(provider: string) {
    const config = this.config$.value;
    if (!config) {
      return '';
    }
    const providerConfig = config[provider];
    if (!providerConfig) {
      return '';
    }

    let result =
      providerConfig.authorizationUrl +
      `?client_id=${providerConfig.clientId}&redirect_uri=${host}${providerConfig.redirectUri}`;

    // special case
    if (provider === 'AZUREAD') {
      result += '&scope=User.Read&response_type=code';
    }

    return result;
  }
}
