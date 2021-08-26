const fs = require("fs");

function readdir(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

console.time("truc");
readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return fs.promises.writeFile("toto.txt", "coucou");
  })
  .then(() => {
    return fs.promises.readFile("toto.txt", { encoding: "utf8" });
  })
  .then((content) => {
    console.log("content: ", content);
    return fs.promises.unlink("toto.txt");
  })
  .then(() => {
    console.timeLog("truc");
  })
  .catch((err) => {
    console.log("err: ", err);
  });
