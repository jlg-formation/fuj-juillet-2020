import {Router} from 'express';
import morgan from 'morgan';
import {mkdirSync} from 'fs';
import path from 'path';
import {createStream} from 'rotating-file-stream';

morgan.token('proxy-remote-addr', (req): string => {
  return req.headers['x-forwarded-for'] as string;
});

const app = Router();

const ACCESSLOG_DIR = path.resolve(process.cwd(), './logs');
mkdirSync(ACCESSLOG_DIR, {recursive: true});

// create a write stream (in append mode)
const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: ACCESSLOG_DIR,
});

app.use((req, res, next) => {
  console.log('req.headers', req);
  next();
});

// setup the logger
app.use(
  morgan(
    ':proxy-remote-addr :method :url :status :res[content-length] - :response-time ms',
    {
      stream: accessLogStream,
    }
  )
);

export const accessLog = app;
