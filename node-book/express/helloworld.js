const express = require('express');
const path = require('path');

const app = express();

app.get('/', function (req, res) {
  res.end('hello world');
});
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../../html')));

app.listen(8080);
