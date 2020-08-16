const http = require("http");
const fs = require("fs");
const unzipper = require("unzipper");

const server = http.createServer((req, res) => {
  //   let matched = req.url.match(/filename=([^&]+)/);

  //   let filename = matched && matched[1];
  //   if (!filename) {
  //     return;
  //   }

  let writestream = unzipper.Extract({ path: "../server/public" });
  //   req.pipe(writestream);

  req.on("data", (trunk) => {
    writestream.write(trunk);
  });
  req.on("end", (trunk) => {
    writestream.end(trunk);
  });

  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  });
});

server.listen(8081);
