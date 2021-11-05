import {Router} from 'express';
import {AuthorizationConfig} from '../interfaces/AuthorizationConfig';
const app = Router();

app.get('/authz/config/:userid', (req, res) => {
  console.log('req: ', req.params);
  res.json({} as AuthorizationConfig);
});

export const authzConfigRouter = app;
