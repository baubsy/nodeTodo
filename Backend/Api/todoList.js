const faunaKey = require("../../secrets.js");
const { Ref } = require("faunadb");
const faunadb = require("faunadb");
const url = require("url");

const q = faunadb.query;

const client = new faunadb.Client({
    secret: faunaKey,
    domain: "db.fauna.com",
});

async function todoList(req, res) {
    let myUrl = url.parse(req.url);
    if (req.method == "POST") {
        let reqData;
        await req.on("data", (data) => {
            reqData = JSON.parse(data.toString());
            console.log(reqData);
        });
        try {
            const dbs = await client.query(
                q.Create(q.Collection("lists"), {
                    data: reqData,
                })
            );
            console.log("list created");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    } else if (req.method == "GET") {
        //gets id from url path
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));
        console.log(id);
        //console.log(myUrl.pathname)
        //get id from request, include data in response
        try {
            client
                .query(q.Get(q.Ref(q.Collection("lists"), id)))
                .then((ret) => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(ret.data));
                    console.log(ret.data);
                });
            // res.writeHead(200, { "Content-Type": "application/json" });
            // res.end(ret.data);
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    } else if (req.method == "PUT") {
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));

        let reqData = { putTest: "dummy" };
        await req.on("data", (data) => {
            reqData = JSON.parse(data.toString());
            console.log(reqData);
        });
        try {
            client.query(
                q.Replace(q.Ref(q.Collection("lists"), id), { data: reqData })
            );
            res.writeHead(200);
            res.end();
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = todoList;
