var fs = require("fs");
var filePath = __dirname + "/info.txt";
var file;

fs.readFile(filePath, { encoding: "utf-8", flag: "r+" }, function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
