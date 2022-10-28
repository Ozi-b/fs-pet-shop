"use strict";

const fs = require("fs");
const path = require("path");
const petsPath = path.join(__dirname, "pets.json");
const petsFuncs = require("./petsFuncs.js");

const http = require("http");
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  let url = req.url.split("/");
  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile(petsPath, "utf-8", function (err, petsJson) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      }
      res.setHeader("Content-Type", "text/plain");
      res.end(petsJson);
    });
  } else if (req.method === "GET" && url[2]) {
    fs.readFile(petsPath, "utf-8", function (err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Internal Server Error");
      } else if (
        (req.method === "GET" &&
          Number(url[2]) > JSON.parse(petsJSON).length - 1) ||
        (req.method === "GET" && Number(url[2]) < 0)
      ) {
        console.log("Should log 404");
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not found");
      } else {
        res.setHeader("Content-Type", "text/plain");
        res.end(JSON.stringify(JSON.parse(petsJSON)[url[2]]));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  }
});

server.listen(port, function () {
  console.log("listening on port", port);
});
