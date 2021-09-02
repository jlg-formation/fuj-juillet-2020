import {User} from './interfaces/User';
import {OAuth2ProviderOptions} from './interfaces/OAuth2';

export abstract class OAuth2 {
  abstract getAccessToken(
    requestToken: string,
    options: OAuth2ProviderOptions
  ): Promise<string>;

  abstract getUserInfo(accessToken: string): Promise<User>;
}
