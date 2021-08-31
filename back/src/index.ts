import {WebServer} from './WebServer';

(async () => {
  const server = new WebServer({
    port: +(process.env.WIAME_NODESERVER_PORT || 3000),
  });
  await server.start();
})();
