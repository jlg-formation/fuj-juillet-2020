import {WebServerOptions} from './interfaces/WebServerOptions';

export const options: Partial<WebServerOptions> = {
  port: +(process.env.WIAME_NODESERVER_PORT || 3000),
  dbUri: process.env.WIAME_DB_URI || 'mongodb://localhost/gestion-stock',
};
