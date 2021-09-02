import {DbServerOptions} from './DbServerOptions';
import {OAuth2Options} from './OAuth2';

export interface WebServerOptions {
  port: number;
  dbOptions: DbServerOptions;
  oauth2: OAuth2Options;
}
