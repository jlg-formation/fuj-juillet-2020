import {DbServerOptions} from './DbServerOptions';

export interface WebServerOptions {
  port: number;
  dbOptions: DbServerOptions;
}
