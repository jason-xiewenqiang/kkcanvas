const express = require('express');
const common = require('../common');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
  res.end('hello world');
});

app.get('/albums.json', common.getAlbumList);

app.get('/albums/:album_name.json', common.getAlbum);

app.listen(8080);
