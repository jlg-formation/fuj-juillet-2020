import ejs from 'ejs';
import {Router} from 'express';
import puppeteer from 'puppeteer';
import {assert} from 'superstruct';
import {ArticleModel} from './../validation/article.model';

const app = Router();

app.post('/article', (req, res) => {
  (async () => {
    try {
      const article = req.body;
      const pdf = await printPDF(article);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdf.length,
      });
      res.status(201).send(pdf);
    } catch (err) {
      res.status(500).end();
    }
  })();
});

export const pdfRouter = app;

async function printPDF(article: unknown) {
  assert(article, ArticleModel);
  const html = await ejs.renderFile('./ejs/article.ejs', {article});
  console.log('html: ', html);
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({format: 'a4'});

  await browser.close();
  return pdf;
}
