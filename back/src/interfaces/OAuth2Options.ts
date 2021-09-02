export type OAuth2Options = {
  [provider: string]: {
    clientID: string;
    clientSecret: string;
    authorizationUrl: string;
    accessTokenUrl: string;
  };
};
