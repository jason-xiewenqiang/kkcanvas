const http = require('http');
const common = require('./common');

const handler = (req, res) => {
  console.log('天后', req.url.substring(9), req.url.substring(0, 9));
  if (req.method.toLowerCase() === 'get' && req.url.substring(0, 9) === '/content/') {
    // getFile(req.url.substring(9), res);
    common.getFilePipe(req.url.substring(9), res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    const out = { error: 'not found', message: `${req.url} not found` };
    res.end(JSON.stringify(out) + '\n');
  }
};
const server = http.createServer(handler);
server.listen(8080);
