const faunaKey = require('../secrets.js');

function todoCreate(res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

module.exports = todoCreate;