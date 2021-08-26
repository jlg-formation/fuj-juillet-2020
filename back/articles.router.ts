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

app.get("/", (req, res) => {
  (async () => {
    try {
      res.json(await db.getArticles());
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});

app.post("/", (req, res, next) => {
  (async () => {
    try {
      const article = req.body as Article;
      if (article.price > 2) {
        res.status(400).send("price > 2");
        return;
      }
      next();
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});

app.post("/", (req, res) => {
  (async () => {
    try {
      const article = req.body as Article;
      await db.addArticle(article);
      res.status(201).json(article);
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});

app.delete("/", (req, res) => {
  (async () => {
    try {
      const ids = req.body as string[];
      db.removeArticle(ids);
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});
