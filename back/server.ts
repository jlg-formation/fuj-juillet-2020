import express from "express";
import serveIndex from "serve-index";
import { articleRouter } from "./articles";

const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW_DIR || "../front/dist/front";

app.use(express.json());

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
