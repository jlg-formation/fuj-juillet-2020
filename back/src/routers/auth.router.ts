import {NextFunction, Request, Response, Router} from 'express';
import {User} from '../interfaces/User';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    afterLoginRoute?: string;
    user?: User;
  }
}

declare module 'http' {
  interface IncomingMessage {
    user: User;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    console.log('not connected.');
    return res.status(401).end();
  }
  const user = req.session.user;
  req.user = user;
  next();
};

const app = Router();

export const authRouter = app;

app.get('/isConnected', (req, res) => {
  if (!req.session.user) {
    console.log('not connected.');
    return res.status(401).end();
  }
  return res.json(req.session.user);
});

app.post('/disconnect', (req, res) => {
  req.session.user = undefined;
  req.session.accessToken = undefined;
  req.session.afterLoginRoute = undefined;
  res.status(204).end();
});
