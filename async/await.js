const fs = require("fs");

const p = fs.promises;

const main = async () => {
  try {
    console.time("truc");
    const files = await p.readdir(".");
    await p.writeFile("toto.txt", "coucou");
    const content = await p.readFile("toto.txt", { encoding: "utf8" });
    console.log("content: ", content);
    await p.unlink("toto.txt");
    console.timeLog("truc");
    console.log("files: ", files);
  } catch (err) {
    console.log("err: ", err);
  }
};

main();
