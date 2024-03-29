const faunaKey = require("../../secrets.js");
const { Ref } = require("faunadb");
const faunadb = require("faunadb");
const url = require("url");

const q = faunadb.query;
const headers = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', "Content-Type": "application/json"}

const client = new faunadb.Client({
    secret: faunaKey,
    domain: "db.fauna.com",
});

async function todoList(req, res) {
    let myUrl = url.parse(req.url);
    //console.log("get debug3");
    //console.log(req.method);

    
    if (req.method == "POST") {
        let reqData;
        await req.on("data", (data) => {
            reqData = JSON.parse(data.toString());
            //console.log(reqData);
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
        //console.log("get debug")
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));

        try {
            client
                .query(q.Get(q.Ref(q.Collection("lists"), id)))
                .then((ret) => {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(ret.data));
                    console.log(ret.data);
                });
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
            res.writeHead(200, headers);
            res.end();
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    } else if (req.method == "DELETE") {
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));

        try {
            client.query(q.Delete(q.Ref(q.Collection("lists"), id)));
            res.writeHead(200, headers);
            res.end();
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = todoList;
