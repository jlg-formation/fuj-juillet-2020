import {Router} from 'express';

import '../modules';
import {Oauth2Config, OAuth2Options} from '../interfaces/OAuth2';
import {OAuth2Factory} from './oauth2/OAuth2Factory';

const app = Router();

export const oAuth2Router = (options: OAuth2Options) => {
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
