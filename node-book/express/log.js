const express = require('express');
const logger = require('express-logger');
const app = express();
app.use(logger({ path: '/path/log/logfile.txt' })).use(function (req, res) {
  res.end('hello world');
});
app.listen(8080);
