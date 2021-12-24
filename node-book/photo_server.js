const http = require('http');
const url = require('url');
const common = require('./common');
const path = require('path');

const handler = (req, res) => {
  req.parseURL = url.parse(req.url, true);
  const coreURL = req.parseURL.pathname;
  console.log(coreURL);
  if (coreURL.substring(0, 7) === '/pages/') {
    common.servePage(req, res);
  } else if (coreURL.substring(0, 11) === '/templates/') {
    common.getFilePipe(`templates/${coreURL.substring(11)}`, res);
  } else if (coreURL.substring(0, 9) === '/content/') {
    common.getFilePipe(`content/${coreURL.substring(9)}`, res);
  } else if (coreURL === '/albums.json') {
    common.getAlbumList(req, res);
  } else if (
    coreURL.substr(0, 7) === '/albums' &&
    ['.png', '.jpg', 'jpeg'].includes(coreURL.substr(coreURL.length - 4))
  ) {
    common.getFilePipe(path.join(__dirname, `/albums${coreURL.substr(7)}`), res);
  } else {
    common.sendFailure(res, 404, common.invalidResource());
  }
};

const server = http.createServer(handler);
server.listen(8080);
