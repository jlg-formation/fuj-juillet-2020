import { DbServer } from "../DbServer";
import { Router } from "express";
import { Article } from "../../interfaces/Article";
import { ArticleRepos } from "../repos/article.repos";
const app = Router();

export const articleRouter = function (db: DbServer) {
  const repos = new ArticleRepos(db);

  app.use((req, res, next) => {
    setTimeout(() => {
      next();
    }, 1);
  });

  app.get("/", (req, res) => {
    (async () => {
      try {
        res.json(await repos.retrieveAll());
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
        const a = req.body as Article;
        await repos.add(a);
        res.status(201).json(a);
      } catch (err) {
        console.log("err: ", err);
      }
    })();
  });

  app.delete("/", (req, res) => {
    (async () => {
      try {
        const ids = req.body as string[];
        repos.remove(ids);
        res.status(204).end();
      } catch (err) {
        console.log("err: ", err);
      }
    })();
  });

  return app;
};
