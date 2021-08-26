import { Router } from "express";
import { Article } from "./interfaces/Article";

const app = Router();

export const articleRouter = app;

let id = 0;
const getId = () => {
  id++;
  const idStr = new String(id).padStart(6, "0");
  return new Date().getTime() + "_" + idStr;
};

let articles: Article[] = [
  { id: getId(), name: "tournevisssss", price: 2.34, qty: 123 },
  { id: getId(), name: "Marteau", price: 11, qty: 4567 },
  { id: getId(), name: "Tondeuse à gazon", price: 234, qty: 3 },
  { id: getId(), name: "Pelle", price: 1.23, qty: 5 },
];

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1);
});

app.get("/", (req, res) => {
  res.json(articles);
});

app.post("/", (req, res, next) => {
  const article = req.body as Article;
  if (article.price > 2) {
    res.status(400).send("price > 2");
    return;
  }
  next();
});

app.post("/", (req, res) => {
  const article = req.body as Article;
  article.id = getId();
  articles.push(article);
  res.status(201).json(article);
});

app.delete("/", (req, res) => {
  const ids = req.body as string[];
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});
