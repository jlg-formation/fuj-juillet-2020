import { Article } from "./interfaces/Article";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost/gestion-stock";

function transform(r: any): Article {
  const article = { ...r };
  article.id = article._id;
  delete article._id;
  return article as Article;
}

const client = new MongoClient(uri);

async function init() {
  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    console.log("databasesList: ", databasesList);
  } catch (err) {
    console.log("err: ", err);
    await client.close();
  }
}

init();

class MongoDb {
  async getArticles(): Promise<Article[]> {
    const results = await client.db().collection("articles").find({}).toArray();
    console.log("results: ", results);
    const articles = results.map((r) => transform(r));
    return articles;
  }

  async addArticle(article: Article): Promise<void> {
    await client.db().collection("articles").insertOne(article);
  }

  async removeArticle(ids: string[]) {
    await client
      .db()
      .collection("articles")
      .deleteMany({
        _id: {
          $in: ids.map((id) => new ObjectId(id)),
        },
      });
  }
}

export const db = new MongoDb();
