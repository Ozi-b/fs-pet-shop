var fs = require("fs");

module.exports = {
  default: function () {
    console.log("Usage: [read | create | update | destroy]");
  },
  read: function (INDEX) {
    fs.readFile("pets.json", "utf-8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);
      } else if (!INDEX) {
        console.log(data);
      } else if (INDEX > data.length - 1 || INDEX < 0) {
        console.log("Usage: node pets.js read INDEX");
      } else {
        console.log(data[INDEX]);
      }
    });
  },
  create: function (AGE, KIND, NAME) {
    fs.readFile("pets.json", "utf-8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(error);
      } else if (!AGE || !KIND || !NAME) {
        console.error("Usage: node pets.js create AGE KIND NAME");
      } else {
        data.push(
          JSON.parse(`{"age": ${AGE}, "kind": "${KIND}", "name": "${NAME}"}`)
        );
        fs.writeFile("pets.json", JSON.stringify(data), (err) => {
          if (err) {
            throw err;
          }
          console.log("A new pet has been added!");
        });
      }
    });
  },
  update: function (ind, age, kind, name) {
    fs.readFile("pets.json", "utf-8", function (error, data) {
      data = JSON.parse(data);
      if (error) {
        console.error(error);
      } else if (!ind || !age || !kind || !name) {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
      } else {
        const index = data.indexOf(ind);
        let newData = { age: age, kind: kind, name: name };
        data.splice(index, 1, newData);
        fs.writeFile("pets.json", JSON.stringify(data), (err) => {
          if (err) {
            throw err;
          }
          console.log("Pet has been updated!");
        });
      }
    });
  },
};
