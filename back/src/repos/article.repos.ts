import { DbServer } from "../DbServer";
import { Article } from "../../interfaces/Article";
import { MongoClient, ObjectId } from "mongodb";

function transform(r: any): Article {
  const article = { ...r };
  article.id = article._id;
  delete article._id;
  return article as Article;
}

export class ArticleRepos {
  client: MongoClient;
  constructor(private db: DbServer) {
    this.client = db.client;
  }

  async retrieveAll(): Promise<Article[]> {
    const results = await this.client
      .db()
      .collection("articles")
      .find({})
      .toArray();
    console.log("results: ", results);
    const articles = results.map((r) => transform(r));
    return articles;
  }

  async add(article: Article): Promise<void> {
    await this.client.db().collection("articles").insertOne(article);
  }

  async remove(ids: string[]) {
    await this.client
      .db()
      .collection("articles")
      .deleteMany({
        _id: {
          $in: ids.map((id) => new ObjectId(id)),
        },
      });
  }
}