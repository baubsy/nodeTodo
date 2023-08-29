const http = require("http");

const port = 3123;
const hostname = '0.0.0.0';
const server = http.createServer(cb);

function cb(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}
console.log("listening");
server.listen(port, hostname);