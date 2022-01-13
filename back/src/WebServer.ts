import {oauth2Client} from '@jlguenego/express-oauth2-client';
import cors from 'cors';
import {crudity} from 'crudity';
import express, {Express} from 'express';
import session from 'express-session';
import {createServer, Server} from 'http';
import path from 'path';
import serveIndex from 'serve-index';
import {api} from './api';
import {authorization} from './authorization/Authorization';
import {authzConfigRouter} from './authorization/authorization-config.router';
import {WebServerOptions} from './interfaces/WebServerOptions';
import {accessLog} from './logs/accessLogs';
import {upload} from './upload/upload.router';
import {validation} from './validation/validation';
import MongoStore from 'connect-mongo';
import {pdfRouter} from './pdf/pdf.router';
export class WebServer {
  app: Express;
  options: WebServerOptions = {
    port: 3000,
    dbUri: 'mongodb://localhost/gestion-stock',
  };
  server: Server;

  constructor(options: Partial<WebServerOptions> = {}) {
    console.log('options: ', options);
    this.options = {...this.options, ...options};
    console.log('this.options: ', this.options);

    const app = express();
    this.app = app;
    this.server = createServer(app);
    const www = path.resolve(process.cwd(), '../front/dist/front');

    app.use(
      session({
        name: 'gestion-stock.sid',
        secret: 'do not change this secret or all session will be reset...',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: options.dbUri,
        }),
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
    app.use((req, res, next) => {
      console.log('req: ', req.session);
      next();
    });

    // Authentication
    app.use('/api', oauth2Client.router());
    app.use('/api/articles', oauth2Client.auth());
    app.use('/api/upload', oauth2Client.auth());
    app.use('/api/pdf', oauth2Client.auth());

    // Authorization
    app.use(authorization);
    app.use('/api', authzConfigRouter);

    // Validation
    app.use(validation);

    // async validation (nothing for the time being)

    // file upload
    app.use('/api/upload', upload);

    // pdf generator
    app.use('/api/pdf', pdfRouter);

    // Business logic with crudity
    app.use(
      '/api/articles',
      crudity(this.server, 'articles', {
        pageSize: 0,
        storage: {
          type: 'mongodb',
          uri: this.options.dbUri,
        },
        validators: [
          {
            name: 'unique',
            args: ['name'],
          },
        ],
      })
    );

    // Misc
    app.use('/api', api);

    app.use(express.static(www));
    app.use(serveIndex(www, {icons: true}));

    app.use((req, res) => {
      res.sendFile(www + '/index.html');
    });
  }

  async start() {
    let isStarted = false;
    return new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          this.server = this.app.listen(this.options.port, () => {
            console.log(
              `Example app listening at http://localhost:${this.options.port}`
            );
            isStarted = true;
            resolve();
          });
          this.server.on('error', async err => {
            if (!isStarted) {
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
          this.server.close(err => {
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
