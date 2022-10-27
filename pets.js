var fs = require("fs");
var crud = require("./petsFuncs.js");

// console.log(process.argv);
if (!process.argv[2]) {
  crud.default();
} else if (process.argv[2] === "read") {
  crud.read(process.argv[3]);
} else if (process.argv[2] === "create") {
  crud.create(process.argv[3], process.argv[4], process.argv[5]);
} else if (process.argv[2] === "update") {
  crud.update(
    process.argv[3],
    process.argv[4],
    process.argv[5],
    process.argv[6]
  );
}
