const express = require('express');
const path = require('path');

const app = express();

app.get('/', function (req, res) {
  res.end('hello world');
});
app.use(express.static(path.join(__dirname, './tBook')));

app.listen(8080);
