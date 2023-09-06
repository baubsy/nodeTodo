const url = require("url");
const todoList = require("./Api/todoList.js");



async function route(req, res) {
    let myUrl = url.parse(req.url);
    if (myUrl.pathname == "/api/todoList") {
        todoList(req, res);
    }
}

module.exports = route;
