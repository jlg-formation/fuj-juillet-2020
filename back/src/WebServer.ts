import {validation} from './validation/validation';
import {authorization} from './authorization/Authorization';
import {accessLog} from './logs/accessLogs';
import {oauth2Client} from '@jlguenego/express-oauth2-client';
import cors from 'cors';
import express, {Express} from 'express';
import session from 'express-session';
import {Server} from 'http';
import path from 'path';
import serveIndex from 'serve-index';
import {DbServer} from './DbServer';
import {WebServerOptions} from './interfaces/WebServerOptions';
import {articleRouter} from './routers/articles.router';
import {api} from './api';
import {authzConfigRouter} from './authorization/Config';

export class WebServer {
  app: Express;
  db: DbServer;
  options: WebServerOptions = {
    port: 3000,
    dbOptions: {
      uri: 'mongodb://localhost/gestion-stock',
    },
  };
  server: Server | undefined;

  constructor(options: Partial<WebServerOptions> = {}) {
    console.log('options: ', options);
    this.options = {...this.options, ...options};
    console.log('this.options: ', this.options);

    this.db = new DbServer(this.options.dbOptions);

    const app = express();
    const www = path.resolve(process.cwd(), '../front/dist/front');

    app.use(
      session({
        name: 'gestion-stock.sid',
        secret: 'do not change this secret or all session will be reset...',
        resave: false,
        saveUninitialized: true,
      })
    );

    app.use(express.json());
    app.use(
      cors((req, callback) => {
        const opts = {
          credentials: true,
          origin: req.headers.origin,
        };
        callback(null, opts);
      })
    );

    // Access logs
    app.use(accessLog);

    // Authentication
    app.use('/api', oauth2Client.router());
    app.use('/api/articles', oauth2Client.auth());

    // Authorization
    app.use(authorization);
    app.use('/api', authzConfigRouter);

    // Validation
    app.use(validation);

    // Business logic
    app.use('/api/articles', articleRouter(this.db));

    // Misc
    app.use('/api', api);

    app.use(express.static(www));
    app.use(serveIndex(www, {icons: true}));

    app.use((req, res) => {
      res.sendFile(www + '/index.html');
    });

    this.app = app;
  }

  async start() {
    let isStarted = false;
    return new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await this.db.start();
          this.server = this.app.listen(this.options.port, () => {
            console.log(
              `Example app listening at http://localhost:${this.options.port}`
            );
            isStarted = true;
            resolve();
          });
          this.server.on('error', async err => {
            if (!isStarted) {
              await this.db.stop();
              reject(err);
            }
          });
        } catch (err) {
          console.log('err: ', err);
        }
      })();
    });
  }

  async stop() {
    return new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          await this.db.stop();
          this.server?.close(err => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        } catch (err) {
          console.log('err: ', err);
        }
      })();
    });
  }
}
