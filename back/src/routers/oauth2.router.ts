import {getAzureADUserInfo} from './oauth2/azuread.oauth2';
import {Router} from 'express';
import got from 'got';

import {OAuth2Options} from '../interfaces/OAuth2Options';
import {User} from '../interfaces/User';
import {getGithubUserInfo} from './oauth2/github.oauth2';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    afterLoginRoute?: string;
    user?: User;
  }
}

export interface Oauth2Config {
  [provider: string]: {
    authorizationUrl: string;
    clientId: string;
    redirectUri: string;
  };
}

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const getOAuth2Options = (): OAuth2Options => {
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

const app = Router();

export const oAuth2Router = (options: OAuth2Options) => {
  const config: Oauth2Config = {};
  for (const p of getKeys(options)) {
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
        const requestToken = req.query.code;
        const url = `${options[p].accessTokenUrl}?client_id=${options[p].clientID}&client_secret=${options[p].clientSecret}&code=${requestToken}`;
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
        if (p === 'GITHUB') {
          const user = await getGithubUserInfo(data.access_token);
          req.session.user = user;
        }
        if (p === 'AZUREAD') {
          const user = await getAzureADUserInfo(data.access_token);
          req.session.user = user;
        }

        res.redirect(req.session.afterLoginRoute || '/');
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  return app;
};
