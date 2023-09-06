const http = require("http");
const route = require('./Route.js');

const port = 3123;
const hostname = '0.0.0.0';
const server = http.createServer(cb);

function cb(req, res){
    route(req, res);
}
console.log("listening");
server.listen(port, hostname);