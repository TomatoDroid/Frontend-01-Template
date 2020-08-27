const http = require("http");
const https = require("https");

const fs = require("fs");
const unzipper = require("unzipper");

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("not found");
    return;
  }

  const options = {
    hostname: "api.github.com",
    // port: 443,
    path: `/user`,
    method: "GET",
    headers: {
      Authorization: `token ${req.headers.token}`,
      "User-Agent": "lz-toy-publish",
    },
  };

  const request = https.request(options, (response) => {
    let body = "";
    response.on("data", (d) => {
      body += d.toString();
    });
    response.on("end", () => {
      let user = JSON.parse(body);
      console.log(user);
      // 权限检查
      let writestream = unzipper.Extract({ path: "../server/public" });

      // req.pipe(writestream);

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
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
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
      if (result) {
        let token = result[1];
        res.writeHead(200, {
          "Content-Type": "text/html",
          access_token: token,
        });
        res.end(
          `<a href="http://localhost:8080/publish?token=${token}">publish</a>`
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("error");
      }
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
}

server.listen(8081);
