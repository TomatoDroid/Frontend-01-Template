const http = require("http");
const https = require("https");

const fs = require("fs");
const unzipper = require("unzipper");

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

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

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  let state = "123abc";
  let client_secret = "885790815f9726e32b6ca631328c9abe1d0d9e65";
  let client_id = "Iv1.3f7e56c40119db70";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  const options = {
    hostname: "github.com",
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: "POST",
  };

  const request = https.request(options, (response) => {
    response.on("data", (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);
      let token = result[1];
      res.writeHead(200, {
        "Content-Type": "text/plain",
        access_token: token,
      });
      res.end("ok");
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
}

server.listen(8081);
