import express from "express";
import serveIndex from "serve-index";
import cors from "cors";

import { articleRouter } from "./articles.router";

const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW_DIR || "./public";

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.use("/api/articles", articleRouter);

app.get("/api/date", (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.use(express.static(www));
app.use(serveIndex(www, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
