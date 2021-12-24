const fs = require('fs');
const path = require('path');

const dirName = 'albums';

const getContentType = (file) => {
  const ext = path.extname(file);
  switch (ext.toLowerCase()) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'text/plain';
  }
};

const getFile = (fileName, res) => {
  const readStream = fs.createReadStream(fileName);
  const cType = getContentType(fileName);
  res.writeHead(200, { 'Content-Type': cType });
  readStream.on('readable', () => {
    const rd = readStream.read();
    if (rd) {
      if (typeof rd === 'string') {
        res.write(rd);
      } else if (typeof rd === 'object' && rd instanceof Buffer) {
        res.write(rd.toString('utf8'));
      }
    }
  });
  readStream.on('end', () => {
    res.end();
  });
  readStream.on('error', (e) => {
    console.log('oh Error', JSON.stringify(e));
    res.end('');
  });
};

const getFilePipe = (fileName, res) => {
  fs.exists(fileName, (exists) => {
    console.log(fileName, exists);
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      const out = { error: 'not found', message: `${fileName} not found` };
      res.end(JSON.stringify(out));
      return;
    }
    const readStream = fs.createReadStream(fileName);
    readStream.on('end', () => {
      res.end();
    });
    const cType = getContentType(fileName);
    res.writeHead(200, { 'Content-Type': cType });
    readStream.pipe(res);
  });
};

const makeError = (err, msg) => {
  const e = new Error(msg);
  e.code = err;
  return e;
};

const success = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const output = { error: null, data };
  res.end(JSON.stringify(output) + '\n');
};

const failure = (res, code, err) => {
  const _code = err.code ? err.code : err.name;
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: _code, message: err.message }) + '\n');
};

const invalidResource = () => {
  return makeError('invalid resource', 'the requested resource does not exist');
};

const noMatchAlbum = () => {
  return makeError('no such album', 'The specifed album does not exist');
};

const loadAlbum = (name, cb) => {
  fs.readdir(`${dirName}/${name}`, (err, files) => {
    if (err) {
      if (err.code == 'ENOENT') {
        cb(noMatchAlbum());
      } else {
        cb(makeError('file error', JSON.stringify(err)));
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
          cb(makeError('file error', JSON.stringify(err)));
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
    if (err && err.error === 'no such album') {
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
      cb(makeError('file error', JSON.stringify(err)));
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
          cb(makeError('file error', JSON.stringify(err)));
          return;
        }
        if (stats.isFile()) {
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

const servePage = (req, res) => {
  const coreURL = req.parseURL.pathname || '';
  const page = coreURL.substring(7);
  console.log('coreURL', coreURL, page);
  if (page !== 'home') {
    failure(res, 404, invalidResource());
    return;
  }
  fs.readFile('content/basic.html', (err, context) => {
    if (err) {
      failure(res, 500, err);
      return;
    }
    context = context.toString('utf8');
    context = context.replace(/{{PAGE_NAME}}/g, page);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(context);
  });
};

module.exports = {
  getFilePipe,
  getFile,
  getAlbum,
  getAlbumList,
  sendFailure: failure,
  invalidResource,
  servePage,
};
