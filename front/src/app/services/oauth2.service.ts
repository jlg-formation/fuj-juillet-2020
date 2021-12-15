import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
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
  config$ = new BehaviorSubject<Oauth2Config | undefined>(undefined);

  constructor(private http: HttpClient, private userService: UserService) {
    (async () => {
      try {
        await lastValueFrom(this.userService.setAfterLoginRoute('/'));
        const config = await lastValueFrom(
          this.http.get<Oauth2Config>('/api/oauth2/config').pipe(delay(500))
        );
        this.config$.next(config);
      } catch (err) {
        console.log('err: ', err);
      }
    })();
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
