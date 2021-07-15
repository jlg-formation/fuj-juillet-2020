import { Router } from "express";
import { Article } from "./interfaces/Article";

const app = Router();

export const articleRouter = app;

const articles: Article[] = [];

let id = 0;
const getId = () => {
  id++;
  return "" + id;
};

app.get("/", (req, res) => {
  res.json(articles);
});

app.post("/", (req, res) => {
  const article = req.body as Article;
  article.id = getId();
  articles.push(article);
  res.status(201).json(article);
});
