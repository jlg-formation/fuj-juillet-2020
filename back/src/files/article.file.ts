import { Article } from "../../interfaces/Article";
import { promises as fs } from "fs";

const filename = "data/articles.json";

let articles: Article[] = [];

async function init() {
  try {
    const str = await fs.readFile(filename, { encoding: "utf-8" });
    articles = JSON.parse(str);
    console.log("articles: ", articles);
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

let id = 0;
const getId = () => {
  id++;
  const idStr = new String(id).padStart(6, "0");
  return new Date().getTime() + "_" + idStr;
};

class FileDb {
  getArticles(): Article[] {
    return articles;
  }

  addArticle(article: Article): void {
    article.id = getId();
    articles.push(article);
    save();
  }

  removeArticle(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
    save();
  }
}

export const db = new FileDb();
