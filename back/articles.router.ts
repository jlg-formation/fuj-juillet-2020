import { Router } from "express";
import { Article } from "./interfaces/Article";
import { promises as fs } from "fs";

const filename = "data/articles.json";

const app = Router();

export const articleRouter = app;

let id = 0;
const getId = () => {
  id++;
  const idStr = new String(id).padStart(6, "0");
  return new Date().getTime() + "_" + idStr;
};

let articles: Article[] = [];

async function init() {
  try {
    const str = await fs.readFile(filename, { encoding: "utf-8" });
    articles = JSON.parse(str);
  } catch (err) {
    console.log("err: ", err);
  }
}

init();

async function save() {
  try {
    await fs.writeFile(filename, JSON.stringify(articles, undefined, 2));
  } catch (err) {
    console.log("err: ", err);
  }
}

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
  save();
  res.status(201).json(article);
});

app.delete("/", (req, res) => {
  const ids = req.body as string[];
  articles = articles.filter((a) => !ids.includes(a.id));
  save();
  res.status(204).end();
});
