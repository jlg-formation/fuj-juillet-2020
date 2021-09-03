import cors from 'cors';
import express, {Express} from 'express';
import session from 'express-session';
import {Server} from 'http';
import serveIndex from 'serve-index';
import {DbServer} from './DbServer';
import {WebServerOptions} from './interfaces/WebServerOptions';
import {articleRouter} from './routers/articles.router';
import {authRouter} from './routers/oauth2/auth.router';
import {oAuth2Router} from './routers/oauth2/oauth2.router';

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
    app.use('/api/oauth2', oAuth2Router());
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
