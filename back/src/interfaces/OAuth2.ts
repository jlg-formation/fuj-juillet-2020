export interface OAuth2Options {
  [provider: string]: {
    clientID: string;
    clientSecret: string;
    authorizationUrl: string;
    accessTokenUrl: string;
  };
}

export interface Oauth2Config {
  [provider: string]: {
    authorizationUrl: string;
    clientId: string;
    redirectUri: string;
  };
}
