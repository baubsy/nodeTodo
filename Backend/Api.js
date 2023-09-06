const faunaKey = require('../secrets.js');
const {Ref} = require('faunadb');
const faunadb = require("faunadb");
const url = require('url');
const http = require("http");

const q = faunadb.query;

const client = new faunadb.Client({
    secret: faunaKey,
    domain: "db.fauna.com"
})

async function route(req, res){
    let title = "temp title"
    let list = [{item: "first item", complete: true}, {item: "first item", complete: false}]
    let user = "dummyUser";

    let myUrl = url.parse(req.url);
    if(req.method == 'POST'){
        if(myUrl.pathname == '/api/todoList'){
            try {
                const dbs = await client.query(
                    q.Create(q.Collection("lists"), {
                        data: {
                            title: title,
                            list: list,
                            user: user
                        }
                    })
                )
                console.log('list created');
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end();
            }
            catch (error){
                console.log("fauna error");
                res.writeHead(500);
                res.end();
                //res.status(500).json({error: error.message});
            }
            
        }
    } else if(req.method == 'GET'){
        
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
}

module.exports = route;