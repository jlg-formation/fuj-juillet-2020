import { WebServer } from "./src/WebServer";

(async () => {
  const server = new WebServer({
    port: +(process.env.WEBSERVER_PORT || 3000),
  });
  await server.start();
})();
