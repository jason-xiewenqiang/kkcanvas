const http = require("http");
const fs = require("fs");
const loadList = (cb) => {
  fs.readdir("albums", (err, files) => {
    if (err) {
      cb(err);
      return;
    }
    const dirs = [];
    (function interator(index) {
      if (index === files.length) {
        cb(null, dirs);
        return;
      }
      fs.stat("albums/" + files[index], (err, stats) => {
        if (err) {
          cb(err);
          return;
        }
        if (stats.isDirectory()) {
          dirs.push(files[index]);
        }
        index++;
        interator(index);
      });
    })(0);
    // for (let i = 0; i < files.length; i++) {
    //     // 这儿是一个异步的。。。所以返回的时候  会空
    //   fs.stat("albums/" + files[i], (err, stats) => {
    //     if (stats.isDirectory()) {
    //       dirs.push(files[i]);
    //     }
    //   });
    // }
    // cb(null, dirs);
  });
};

const hander = (req, res) => {
  console.log(`incoming request: ${req.method} ${req.url}`);

  loadList((err, albums) => {
    if (err) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify(err) + "\n");
      return;
    }
    const out = { error: null, data: { albums } };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(out) + "\n");
  });
};

const server = http.createServer(hander);
server.listen(8888);
