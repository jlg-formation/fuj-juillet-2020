import ejs from 'ejs';
import {Router} from 'express';
import {basename} from 'path';
import puppeteer from 'puppeteer';
import {assert} from 'superstruct';
import {ArticleModel} from './../validation/article.model';
import fs from 'fs';

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

async function getImageContent(url: string) {
  console.log('url: ', url);
  const imgFilename = './uploads/' + basename(url);
  console.log('imgFilename: ', imgFilename);
  const buffer = await fs.promises.readFile(imgFilename);
  console.log('buffer: ', buffer);
  return 'data:image/jpeg;base64,' + buffer.toString('base64');
}

async function printPDF(article: unknown) {
  assert(article, ArticleModel);
  const images = [];
  for (const url of article.images) {
    const imgData = await getImageContent(url);
    images.push(imgData);
  }
  const cssFileContent = await fs.promises.readFile('./ejs/article.css');
  const css = `<style>${cssFileContent}</style>`;
  const html = await ejs.renderFile('./ejs/article.ejs', {
    article,
    images,
    css,
  });
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({format: 'a4'});

  await browser.close();
  return pdf;
}
