import {Router} from 'express';
import {AuthorizationConfig} from '../interfaces/AuthorizationConfig';
const app = Router();

app.get('/authz/config/:provider/:userid', (req, res) => {
  console.log('req.params: ', req.params);
  if (req.params.provider === 'azure AD') {
    res.json({
      path: ['/stock'],
      privilege: [],
    } as AuthorizationConfig);
    return;
  }
  res.json({
    path: ['/stock*'],
    privilege: ['stock.add'],
  } as AuthorizationConfig);
});

export const authzConfigRouter = app;
