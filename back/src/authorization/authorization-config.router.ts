import {Router} from 'express';
import {AuthorizationConfig} from '../interfaces/AuthorizationConfig';
const app = Router();

app.get('/authz/config/:provider/:userid', (req, res) => {
  console.log('req: ', req.params);
  if (req.params.provider === 'azure AD') {
    res.json({
      path: {
        whiteList: ['/stock'],
      },
      privilege: {
        blackList: ['stock.add'],
      },
    } as AuthorizationConfig);
    return;
  }
  res.json({
    path: {
      whiteList: ['/stock', '/stock/add'],
    },
    privilege: {
      // blackList: ['stock.add'],
    },
  } as AuthorizationConfig);
});

export const authzConfigRouter = app;
