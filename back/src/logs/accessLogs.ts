import {Router} from 'express';
import morgan from 'morgan';
import {mkdirSync} from 'fs';
import path from 'path';
import {createStream} from 'rotating-file-stream';

const app = Router();

const ACCESSLOG_DIR = path.resolve(process.cwd(), './logs');
mkdirSync(ACCESSLOG_DIR, {recursive: true});

// create a write stream (in append mode)
const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: ACCESSLOG_DIR,
});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

export const accessLog = app;
