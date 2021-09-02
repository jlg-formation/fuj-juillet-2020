import {WebServerOptions} from './interfaces/WebServerOptions';

export const options: Partial<WebServerOptions> = {
  port: +(process.env.WIAME_NODESERVER_PORT || 3000),
};
