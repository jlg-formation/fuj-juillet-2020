import {ArticleModel} from './model';
import {Router} from 'express';
import {assert} from 'superstruct';

const app = Router();

app.post('/api/articles', (req, res, next) => {
  try {
    assert(req.body, ArticleModel);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
      return;
    }
    res.status(500).end();
    return;
  }
  next();
});

export const validation = app;
