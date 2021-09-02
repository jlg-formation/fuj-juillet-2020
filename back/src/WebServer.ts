import {authRouter} from './routers/auth.router';
import cors from 'cors';
import express, {Express} from 'express';
import session from 'express-session';
import {Server} from 'http';
import serveIndex from 'serve-index';

import {oAuth2Router} from './routers/oauth2.router';
import {articleRouter} from './routers/articles.router';
import {DbServer, DbServerOptions} from './DbServer';
import {OAuth2Options} from './interfaces/OAuth2Options';

interface WebServerOptions {
  port: number;
  dbOptions: DbServerOptions;
  oauth2: OAuth2Options;
}

export class WebServer {
  options: WebServerOptions = {
    port: 3000,
    dbOptions: {
      uri: 'mongodb://localhost/gestion-stock',
    },
    oauth2: {
      clientID: process.env.OAUTH2_CLIENT_ID || 'TBD',
      clientSecret: process.env.OAUTH2_CLIENT_SECRET || 'TBD',
      authorizationUrl: process.env.OAUTH2_AUTHORIZATION_URL || 'TBD',
      accessTokenUrl: process.env.OAUTH2_ACCESS_TOKEN_URL || 'TBD',
    },
  };

  app: Express;
  server: Server | undefined;
  db: DbServer;

  constructor(options: Partial<WebServerOptions> = {}) {
    console.log('options: ', options);
    this.options = {...this.options, ...options};
    console.log('this.options: ', this.options);

    this.db = new DbServer(this.options.dbOptions);

    const app = express();
    const www = '../front/dist/front';

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
        const options = {
          credentials: true,
          origin: req.headers.origin,
        };
        callback(null, options);
      })
    );

    app.use((req, res, next) => {
      console.log('req: ', req.url);
      next();
    });

    app.use('/api/articles', articleRouter(this.db));
    app.use('/api/oauth', oAuth2Router(this.options.oauth2));
    app.use('/api/auth', authRouter);

    app.get('/api/date', (req, res) => {
      res.json({
        date: new Date(),
      });
    });

    app.get('/api/crash', () => {
      (async () => {
        throw new Error('bam! Crash...');
      })();
    });

    app.use(express.static(www));
    app.use(serveIndex(www, {icons: true}));
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
