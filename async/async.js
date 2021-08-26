const fs = require("fs");

console.time("truc");
fs.readdir(".", (err, files) => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  console.log("files: ", files);
  fs.writeFile("toto.txt", "coucou", (err) => {
    if (err) {
      console.log("err: ", err);
      return;
    }
    fs.readFile("toto.txt", { encoding: "utf8" }, (err, content) => {
      if (err) {
        console.log("err: ", err);
        return;
      }
      console.log("content: ", content);
      fs.unlink("toto.txt", (err) => {
        if (err) {
          console.log("err: ", err);
          return;
        }
        console.timeLog("truc");
      });
    });
  });
});
