import cors from "cors";
import express, { Express } from "express";
import { Server } from "http";
import serveIndex from "serve-index";
import { articleRouter } from "./routers/articles.router";
import { DbServer, DbServerOptions } from "./DbServer";

interface WebServerOptions {
  port: number;
  dbOptions: DbServerOptions;
}

export class WebServer {
  options: WebServerOptions = {
    port: 3000,
    dbOptions: {
      uri: "mongodb://localhost/gestion-stock",
    },
  };

  app: Express;
  server: Server | undefined;
  db: DbServer;

  constructor(options: Partial<WebServerOptions> = {}) {
    console.log("options: ", options);
    this.options = { ...this.options, ...options };
    console.log("this.options: ", this.options);

    this.db = new DbServer(this.options.dbOptions);

    const app = express();
    const www = "./public";

    app.use(express.json());
    app.use(cors());

    app.use((req, res, next) => {
      console.log("req: ", req.url);
      next();
    });

    app.use("/api/articles", articleRouter(this.db));

    app.get("/api/date", (req, res) => {
      res.json({
        date: new Date(),
      });
    });

    app.use(express.static(www));
    app.use(serveIndex(www, { icons: true }));
    this.app = app;
  }

  async start() {
    let isStarted = false;
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.db.start();
        this.server = this.app.listen(this.options.port, () => {
          console.log(
            `Example app listening at http://localhost:${this.options.port}`
          );
          isStarted = true;
          resolve();
        });
        this.server.on("error", (err) => {
          if (!isStarted) {
            reject(err);
          }
        });
      } catch (err) {
        console.log("err: ", err);
      }
    });
  }

  async stop() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.db.stop();
        this.server?.close((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      } catch (err) {}
    });
  }
}
