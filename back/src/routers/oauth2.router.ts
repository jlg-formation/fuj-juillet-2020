import {Router} from 'express';

import '../modules';
import {Oauth2Config, OAuth2Options} from '../interfaces/OAuth2';
import {OAuth2Factory} from './oauth2/OAuth2Factory';

const app = Router();

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

const options = getOAuth2Options();

export const oAuth2Router = () => {
  const config: Oauth2Config = {};
  for (const p of Object.keys(options)) {
    config[p] = {
      authorizationUrl: options[p].authorizationUrl,
      clientId: options[p].clientID,
      redirectUri: `/api/oauth/redirect/${p}`,
    };
  }

  app.get('/config', (req, res) => {
    res.json(config);
  });

  app.get('/redirect/:provider', (req, res) => {
    const p = req.params.provider;
    (async () => {
      try {
        const requestToken = req.query.code as string;
        if (!requestToken) {
          throw new Error('The requestToken is not defined.');
        }
        const oauth2 = OAuth2Factory.get(p);
        const accessToken = await oauth2.getAccessToken(
          requestToken,
          options[p]
        );

        const user = await oauth2.getUserInfo(accessToken);
        req.session.user = user;
        res.redirect(req.session.afterLoginRoute || '/');
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  return app;
};
