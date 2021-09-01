import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Oauth2Service {
  connectUrl = 'https://github.com/login/oauth/authorize';
  clientId = 'Iv1.6752065f0d086d79';
  redirectUri = 'http://localhost:4200/api/oauth/redirect';

  constructor() {}

  getConnectUrl() {
    const queryObject: any = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    };
    return (
      this.connectUrl +
      '?' +
      Object.keys(queryObject)
        .map((key) => `${key}=${queryObject[key]}`)
        .join('&')
    );
  }
}
