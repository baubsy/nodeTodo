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
    let title = "temp title";
    let list = [
        { item: "first item", complete: true },
        { item: "first item", complete: false },
    ];
    let user = "dummyUser";

    let myUrl = url.parse(req.url);
    if (req.method == "POST") {
        try {
            const dbs = await client.query(
                q.Create(q.Collection("lists"), {
                    data: {
                        title: title,
                        list: list,
                        user: user,
                    },
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
        let dummyId = "375080984463278161";
        //get id from request, include data in response
        try {
            client
                .query(q.Get(q.Ref(q.Collection("lists"), dummyId)))
                .then((ret) => console.group(ret));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        } catch (error) {
            console.log("fauna error");
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = todoList;
