import {Router} from 'express';
import got from 'got';

import {OAuth2Options} from '../interfaces/OAuth2Options';
import {User} from '../interfaces/User';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    afterLoginRoute?: string;
    user?: User;
  }
}

const app = Router();

export const oAuth2Router = (options: OAuth2Options) => {
  const clientID = options.clientID;
  const clientSecret = options.clientSecret;

  const authorizationServerUrl = options.accessTokenUrl;

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

        // get the user info
        const user = await got
          .get('https://api.github.com/user', {
            headers: {
              // This header informs the Github API about the API version
              Accept: 'application/vnd.github.v3+json',
              // Include the token in the Authorization header
              Authorization: 'token ' + data.access_token,
            },
          })
          .json<{name: string; email: string; login: string}>();
        console.log('user: ', user);
        req.session.user = {
          displayName: user.name,
          email: user.email,
          id: user.login,
        };
        res.redirect(req.session.afterLoginRoute || '/');
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  return app;
};
