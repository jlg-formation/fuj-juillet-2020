import {Router} from 'express';
import got from 'got';

const app = Router();

export const oAuth2Router = app;

const clientID = '<your client id>';
const clientSecret = '<your client secret>';

const authorizationServerUrl = 'https://github.com/login/oauth/access_token';

app.get('/oauth/redirect', (req, res) => {
  (async () => {
    try {
      const requestToken = req.query.code;
      const url = `${authorizationServerUrl}?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`;
      const {data} = await got
        .post(url, {
          json: {
            hello: 'world',
          },
        })
        .json();
      // Once we get the response, extract the access token from
      // the response body
      const accessToken = data.access_token;
      // redirect the user to the welcome page, along with the access token
      res.redirect(`/welcome.html?access_token=${accessToken}`);
    } catch (error) {
      console.log('error: ', error);
      res.status(500).end();
    }
  })();
});
