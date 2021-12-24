const http = require('http');
function process_requrest (req, res) {
    const body = 'thanks for calling!\n';
    const content_length = body.length;
    res.writeHead(200, {
        'Content_Length': content_lenggth,
        'Content-Type': 'text/plain'
    });
    res.end(body)
}
const s = http.createServer(process_requrest)
s.listen(8080)