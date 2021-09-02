import {options} from './options';
import {WebServer} from './WebServer';

(async () => {
  const server = new WebServer(options);
  await server.start();
})();
