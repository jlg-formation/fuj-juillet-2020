import assert from "assert";
import { WebServer } from "../src/Server";
import got from "got";

describe("Server", function () {
  it("should start and stop", async function () {
    const server = new WebServer({ port: 3400 });
    await server.start();
    // const data = await got.get("http://localhost:3400/api/articles").json();
    // console.log("data: ", data);
    await server.stop();
    // assert(data instanceof Array);
  });
});
