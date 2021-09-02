import {OAuth2Options} from './interfaces/OAuth2';
import {WebServerOptions} from './interfaces/WebServerOptions';

const getOAuth2Options = (): OAuth2Options => {
  const providerList = process.env.OAUTH2_PROVIDER_LIST;
  if (!providerList) {
    return {};
  }
  const providers = providerList.split(',');
  const options: OAuth2Options = {};
  for (const p of providers) {
    options[p] = {
      clientID: process.env[`OAUTH2_${p}_CLIENT_ID`] || 'TBD',
      clientSecret: process.env[`OAUTH2_${p}_CLIENT_SECRET`] || 'TBD',
      authorizationUrl: process.env[`OAUTH2_${p}_AUTHORIZATION_URL`] || 'TBD',
      accessTokenUrl: process.env[`OAUTH2_${p}_ACCESS_TOKEN_URL`] || 'TBD',
    };
  }
  return options;
};

export const options: Partial<WebServerOptions> = {
  port: +(process.env.WIAME_NODESERVER_PORT || 3000),
  oauth2: getOAuth2Options(),
};
