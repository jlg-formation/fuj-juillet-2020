import got from 'got';
import {OAuth2ProviderOptions} from '../interfaces/OAuth2';
import {User} from '../interfaces/User';
import {OAuth2} from '../OAuth2';

export class GithubOAuth2 extends OAuth2 {
  async getAccessToken(
    requestToken: string,
    options: OAuth2ProviderOptions
  ): Promise<string> {
    const url = `${options.accessTokenUrl}?client_id=${options.clientID}&code=${requestToken}&client_secret=${options.clientSecret}`;
    console.log('url: ', url);
    const data = (await got.post(url).json()) as {access_token: string};
    console.log('data: ', data);
    return data.access_token;
  }

  async getUserInfo(accessToken: string): Promise<User> {
    const data = await got
      .get('https://api.github.com/user', {
        headers: {
          // This header informs the Github API about the API version
          Accept: 'application/vnd.github.v3+json',
          // Include the token in the Authorization header
          Authorization: 'token ' + accessToken,
        },
      })
      .json<{name: string; email: string; login: string}>();
    const user = {
      displayName: data.name,
      email: data.email,
      id: data.login,
      identityProvider: 'github',
    };
    console.log('user: ', user);
    return user;
  }
}
