const { application } = require("express");
const express = require("express");
const { reset } = require("nodemon");
const { Client } = require("pg");

//const config = require("./config.json")[process.env.NODE_ENV || "dev"];

const connectionString = "postgresql://postgres:docker@127.0.0.1:5432/pets";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

const app = express();
const PORT = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/pets", (req, res) => {
  client
    .query("SELECT * FROM pets")
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows);
    })
    .catch((e) => console.error(e.stack));
});

app.post("/api/pets/", (req, res) => {
  client
    .query(
      `INSERT INTO pets (age, kind, name) VALUES (${req.body.age}, '${req.body.kind}', '${req.body.name}')`
    )
    .then((result) => {
      console.log("Added new pet to table");
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.patch("/api/pets/:id/", (req, res) => {
  client
    .query(
      `UPDATE pets SET name='${req.body.name}' WHERE id = ${req.params.id}`
    )
    .then((result) => {
      console.log("Changed pet row");
      res.send(req.body);
    })
    .catch((e) => console.error(e.stack));
});

app.delete("/api/pets/:id", (req, res) => {
  client
    .query(`DELETE FROM pets WHERE id = '${req.params.id}'`)
    .then((result) => {
      console.log("Deleted pet");
      res.send("Deleted pet you monster!");
    })
    .catch((e) => console.error(e.stack));
});

app.get("/api/pets/:id", (req, res) => {
  //using async/await
  console.log(req.params.id);

  async function getPets() {
    try {
      const result = await client.query(
        `SELECT * FROM pets WHERE id = ${req.params.id}`
      );
      console.log(result);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }

  getPets();
});

// app.get("/api/students/:id", (req, res) => {
//   client
//     .query("SELECT * FROM students WHERE id = $1", [req.params.id])
//     .then((result) => {
//       console.log(result.rows[0]);
//       res.send(result.rows);
//     })
//     .catch((e) => console.error(e.stack));
// });
app.use((req, res) => {
  res.status(404).sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Our app running on ${PORT}`);
});
