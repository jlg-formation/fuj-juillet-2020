import {Router} from 'express';
import puppeteer from 'puppeteer';

const app = Router();

app.post('/article', (req, res) => {
  (async () => {
    try {
      const pdf = await printPDF();
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

async function printPDF() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/legal', {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({format: 'a4'});

  await browser.close();
  return pdf;
}
