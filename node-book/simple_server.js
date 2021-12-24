const http = require("http");
const hander = (req, res) => {
  console.log(`incoming request: ${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: null }) + "\n");
};
const server = http.createServer(hander);
server.listen(8080);
