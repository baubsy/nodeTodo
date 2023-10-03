const http = require("http");
const route = require('./Route.js');

const port = 3123;
const hostname = '0.0.0.0';
const server = http.createServer(cb);

function cb(req, res){
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000,
        'Access-Control-Allow-Headers' : "*"
      };
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
      }
    route(req, res);
}
console.log("listening");
server.listen(port, hostname);