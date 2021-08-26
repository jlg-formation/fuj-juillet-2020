import { Router } from "express";
import { Article } from "./interfaces/Article";
import { db } from "./articles.mongo";
const app = Router();

export const articleRouter = app;

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1);
});

app.get("/", async (req, res) => {
  res.json(await db.getArticles());
});

app.post("/", (req, res, next) => {
  const article = req.body as Article;
  if (article.price > 2) {
    res.status(400).send("price > 2");
    return;
  }
  next();
});

app.post("/", async (req, res) => {
  const article = req.body as Article;
  await db.addArticle(article);
  res.status(201).json(article);
});

app.delete("/", (req, res) => {
  const ids = req.body as string[];
  db.removeArticle(ids);
  res.status(204).end();
});
