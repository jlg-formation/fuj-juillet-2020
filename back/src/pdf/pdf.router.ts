import {Router} from 'express';

const app = Router();

app.post('/article', (req, res) => {
  res.status(201).sendFile('./temp/test.pdf', {root: process.cwd()});
});

export const pdfRouter = app;
