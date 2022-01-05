import {Request, Router} from 'express';
const app = Router();

const isAuthorized = (req: Request) => {
  if (req.url === '/api/articles' && req.method === 'POST') {
    if (req.user.identityProvider === 'azure AD') {
      return false;
    }
  }
  return true;
};

app.use((req, res, next) => {
  const authorized = isAuthorized(req);
  if (!authorized) {
    res.status(403).end();
    return;
  }
  next();
});

export const authorization = app;
