const fs = require("fs");

try {
  console.time("truc");
  const files = fs.readdirSync(".");
  fs.writeFileSync("toto.txt", "coucou");
  const content = fs.readFileSync("toto.txt", { encoding: "utf8" });
  console.log("content: ", content);
  fs.unlinkSync("toto.txt");
  console.timeLog("truc");
  console.log("files: ", files);
} catch (err) {
  console.log("err: ", err);
}
