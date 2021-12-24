const http = require("http");
const fs = require("fs");
const dirName = "albums";

const makeError = (err, msg) => {
  const e = new Error(msg);
  e.code = err;
  return e;
};

const success = (res, data) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const output = { error: null, data };
  res.end(JSON.stringify(output) + "\n");
};

const failure = (res, code, err) => {
  const _code = err.code ? err.code : err.name;
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: _code, message: err.message }) + "\n");
};

const invalidResource = () => {
  return makeError("invalid resource", "the requested resource does not exist");
};

const noMatchAlbum = () => {
  return makeError("no such album", "The specifed album does not exist");
};

const loadAlbum = (name, cb) => {
  fs.readdir(`${dirName}/${name}`, (err, files) => {
    if (err) {
      if (err.code == "ENOENT") {
        cb(noMatchAlbum());
      } else {
        cb(makeError("file error", JSON.stringify(err)));
      }
      return;
    }
    const list = [];
    const path = `${dirName}/${name}/`;
    (function interator(index) {
      if (index === files.length) {
        const obj = { shortName: name, photos: list };
        cb(null, obj);
        return;
      }
      fs.stat(path + files[index], (err, stats) => {
        if (err) {
          cb(makeError("file error", JSON.stringify(err)));
          return;
        }
        if (stats.isFile()) {
          const obj = { fileName: files[index], desc: files[index] };
          list.push(obj);
        }
        index++;
        interator(index);
      });
    })(0);
  });
};

const getAlbum = (req, res) => {
  const albumName = req.url.substr(7, req.url.length - 12);
  loadAlbum(albumName, (err, ctx) => {
    if (err && err.error === "no such album") {
      failure(res, 404, err);
    } else if (err) {
      failure(res, 500, err);
    } else {
      success(res, { albumData: ctx });
    }
  });
};

const loadList = (cb) => {
  fs.readdir(dirName, (err, files) => {
    if (err) {
      cb(makeError("file error", JSON.stringify(err)));
      return;
    }
    const dirs = [];
    (function interator(index) {
      if (index === files.length) {
        cb(null, dirs);
        return;
      }
      fs.stat(`${dirName}/${files[index]}`, (err, stats) => {
        if (err) {
          cb(makeError("file error", JSON.stringify(err)));
          return;
        }
        if (stats.isDirectory()) {
          dirs.push({ name: files[index] });
        }
        index++;
        interator(index);
      });
    })(0);
  });
};

const getAlbumList = (req, res) => {
  loadList((err, alb) => {
    if (err) {
      failure(res, 500, err);
      return;
    }
    success(res, { albums: alb });
  });
};

// 处理请求的类型
const hander = (req, res) => {
  console.log(`incoming request: ${req.method} ${req.url}`);
  if (req.url === "/albums.json") {
    console.log(1);
    getAlbumList(req, res);
  } else if (
    req.url.substr(0, 7) == "/albums" &&
    req.url.substr(req.url.length - 5) == ".json"
  ) {
    console.log(2);
    getAlbum(req, res);
  } else {
    console.log(3);
    failure(res, 404, invalidResource());
  }
};

const server = http.createServer(hander);
server.listen(8888);
