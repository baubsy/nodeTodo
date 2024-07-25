const dataBaseSecrets = require("../../secrets.js");
//const faunaKey = "temp dummy"
const { Ref } = require("faunadb");
const faunadb = require("faunadb");
const url = require("url");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dataBaseSecrets.name,
    dataBaseSecrets.user,
    dataBaseSecrets.pass,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
  console.log('mysql connected')
}).catch((error) => {
  console.log('error');
})

//const q = faunadb.query;
const headers = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', "Content-Type": "application/json"}

/*
const client = new faunadb.Client({
    secret: faunaKey,
    domain: "db.fauna.com",
});
*/
async function todoList(req, res) {
    let myUrl = url.parse(req.url);
    //console.log("get debug3");
    //console.log(req.method);

    
    if (req.method == "POST") {
        let reqData;
        await req.on("data", (data) => {
            reqData = JSON.parse(data.toString());
            console.log(reqData);
        });
        try {
            /*
            const dbs = await client.query(
                q.Create(q.Collection("lists"), {
                    data: reqData,
                })
            );
            */
           //TODO parse request data to suitable format and submit to mysql
            console.log("list created");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();
        } catch (error) {
            console.log("database error");
            res.writeHead(500);
            res.end();
        }
    } else if (req.method == "GET") {
        //gets id from url path
        //console.log("get debug")
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));

        try {
            /*
            client
                .query(q.Get(q.Ref(q.Collection("lists"), id)))
                .then((ret) => {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(ret.data));
                    console.log(ret.data);
                });
                */
               //TODO retrieve lists from mysql
               const tempList = {
                title: "temp",
                list: [
                    {
                    "item": "first item",
                    "complete": true,
                    "id": 1
                    },
                    {
                        "item": "second item",
                        "complete": false,
                        "id": 2
                        }
            ]
               }
               res.writeHead(200, headers)
               //res.end(JSON.stringify(ret.data));
               res.end(JSON.stringify(tempList));
                console.log(ret.data);
        } catch (error) {
            console.log("database error");
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
            /*
            client.query(
                q.Replace(q.Ref(q.Collection("lists"), id), { data: reqData })
            );
            */
           //TODO write code to update entry in mysql
            res.writeHead(200, headers);
            res.end();
        } catch (error) {
            console.log("database error");
            res.writeHead(500);
            res.end();
        }
    } else if (req.method == "DELETE") {
        let reg = /[0-9]+/i;
        let id = myUrl.pathname.slice(myUrl.pathname.search(reg));

        try {
            //client.query(q.Delete(q.Ref(q.Collection("lists"), id)));
            //TODO code to delete entry from mysql
            res.writeHead(200, headers);
            res.end();
        } catch (error) {
            console.log("database error");
            res.writeHead(500);
            res.end();
        }
    }
}

module.exports = todoList;
