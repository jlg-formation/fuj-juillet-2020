import {Router} from 'express';
import got from 'got';

import {OAuth2Options} from '../interfaces/OAuth2Options';

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
        const accessToken = data.access_token;
        // redirect the user to the welcome page, along with the access token
        res.redirect(`/stock?access_token=${accessToken}`);
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  return app;
};
