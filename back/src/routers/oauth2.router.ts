import {Router} from 'express';
import got from 'got';

import {OAuth2Options} from '../interfaces/OAuth2Options';
import {User} from '../interfaces/User';
import {getUserInfo} from './oauth2/github.oauth2';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    afterLoginRoute?: string;
    user?: User;
  }
}

export interface Oauth2Config {
  authorizationUrl: string;
  clientId: string;
  redirectUri: string;
}

const app = Router();

export const oAuth2Router = (options: OAuth2Options) => {
  const clientID = options.clientID;
  const clientSecret = options.clientSecret;

  const authorizationServerUrl = options.accessTokenUrl;

  const config: Oauth2Config = {
    authorizationUrl: options.authorizationUrl,
    clientId: options.clientID,
    redirectUri: '/api/oauth/redirect',
  };

  app.get('/config', (req, res) => {
    res.json(config);
  });

  app.get('/redirect', (req, res) => {
    (async () => {
      try {
        const requestToken = req.query.code;
        const url = `${authorizationServerUrl}?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`;
        console.log('url: ', url);
        const data = (await got
          .post(url, {
            json: {
              hello: 'world',
            },
          })
          .json()) as {access_token: string};
        // Once we get the response, extract the access token from
        // the response body
        console.log('data: ', data);
        req.session.accessToken = data.access_token;

        const user = await getUserInfo(data.access_token);
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
