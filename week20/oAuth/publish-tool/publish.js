const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");

let packname = "./package";

const redirect_uri = encodeURIComponent("http://localhost:8081/auth");
child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.3f7e56c40119db70&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`
);

const server = http.createServer((request, res) => {
  let token = request.url.match(/token=([^&]+)/)[1];
  console.log("real publish");

  const options = {
    hostname: "localhost",
    port: 8081,
    path: "/?filename=" + "package.zip",
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      token: token,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.directory(packname, false);

  archive.finalize();

  archive.pipe(req);

  archive.on("end", () => {
    req.end();
    console.log("publish success!!");
    server.close();
  });
});

server.listen(8080);
