const url = require("url");
const todoList = require("./Api/todoList.js");



async function route(req, res) {
    let myUrl = url.parse(req.url);
    console.log(myUrl.pathname);
    if (myUrl.pathname.includes("/api/todoList")) {
        todoList(req, res);
    }
}

module.exports = route;
