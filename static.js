const express = require('express');
const path = require('path');

const app = express();

app.get('/', function (req, res) {
  res.end('hello world');
});
app.use(express.static('./html'));

app.listen(8080);
