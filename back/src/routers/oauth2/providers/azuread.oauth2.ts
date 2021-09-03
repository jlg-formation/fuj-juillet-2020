import got from 'got';
import {OAuth2ProviderOptions} from '../interfaces/OAuth2';
import {User} from '../interfaces/User';
import {OAuth2} from '../OAuth2';

const domain = process.env.DOMAIN_URL || 'http://localhost:4200';

export class AzureADOAuth2 extends OAuth2 {
  async getAccessToken(
    requestToken: string,
    options: OAuth2ProviderOptions
  ): Promise<string> {
    const url = `${options.accessTokenUrl}`;
    const body: {[key: string]: string} = {
      grant_type: 'authorization_code',
      client_id: options.clientID,
      client_secret: options.clientSecret,
      code: '' + requestToken,
      redirect_uri: domain + '/api/oauth2/redirect/AZUREAD',
    };
    const data: {access_token: string} = await got(url, {
      method: 'POST',
      form: body,
      // throwHttpErrors: false,
    }).json();
    console.log('data: ', data);
    return data.access_token;
  }

  async getUserInfo(accessToken: string): Promise<User> {
    const data = await got
      .get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          // Include the token in the Authorization header
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .json<{
        displayName: string;
        userPrincipalName: string;
        surname: string;
      }>();
    console.log('azure ad data: ', data);
    const user = {
      displayName: data.displayName,
      email: data.userPrincipalName,
      id: data.surname,
      identityProvider: 'azure AD',
    };
    console.log('user: ', user);
    return user;
  }
}
