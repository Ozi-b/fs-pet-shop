const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const http = require("http");
const petsPath = path.join(__dirname, "pets.json");
const { json, application } = require("express");

app.use(express.json());

app.get("/pets", (req, res) => {
  fs.readFile(petsPath, "utf-8", function (err, petsJSON) {
    console.log("made it to server");
    res.type("json");
    res.end(petsJSON);
  });
});

app.get("/pets/:num", (req, res, next) => {
  fs.readFile(petsPath, "utf-8", (err, petsJSON) => {
    const num = req.params.num;
    let petsLastIndex = JSON.parse(petsJSON).length - 1;
    if (
      (!Number(num) && Number(num) != 0) ||
      Number(num) < 0 ||
      Number(num) > petsLastIndex
    ) {
      next({
        status: 404,
        message: `Not found. Please enter a number between 0 and ${petsLastIndex}`,
      });
    } else {
      petsJSON = JSON.parse(petsJSON);
      res.json(petsJSON[num]);
      console.log(`displaying pet at index ${num} to user`);
    }
  });
});

app.post("/pets/:age/:kind/:name", (req, res, next) => {
  fs.readFile(petsPath, "utf-8", function (err, petsJSON) {
    const age = req.params.age;
    const kind = req.params.kind;
    const name = req.params.name;
    petsJSON = JSON.parse(petsJSON);
    if (age !== Number(age) || kind === "" || name === "") {
      next({ status: 400, message: "Bad Request. Incorect key value inputs." });
    } else {
      petsJSON.push(req.body);
      console.log(petsJSON);
      console.log(req.body);
    }
    fs.writeFile(petsPath, JSON.stringify(petsJSON), (err) => {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
      console.log("post request recieved!");
      console.log("pets.JSON has been updated!");
    });
  });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
