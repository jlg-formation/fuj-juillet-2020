import {Router} from 'express';

const app = Router();

app.get('/date', (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.get('/crash', () => {
  (async () => {
    throw new Error('bam! Crash...');
  })();
});

app.use((req, res) => {
  res.status(404).end();
});

export const api = app;
