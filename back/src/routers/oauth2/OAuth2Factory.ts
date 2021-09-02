import {AzureADOAuth2} from './azuread.oauth2';
import {GithubOAuth2} from './github.oauth2';
import {OAuth2} from './OAuth2';

export class OAuth2Factory {
  static get(provider: string): OAuth2 {
    if (provider === 'GITHUB') {
      return new GithubOAuth2();
    } else if (provider === 'AZUREAD') {
      return new AzureADOAuth2();
    }
    throw new Error(`Provider unknown: ${provider}`);
  }
}
