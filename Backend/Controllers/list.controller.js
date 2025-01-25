const {Sequelize, DataTypes} = require("sequelize");
const dataBaseSecrets = require("../../secrets.js");
const List = require("../Models/list.model.js")

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



sequelize.sync().then(() => {
  console.log('lists table create');
    //debug row creator
  List.create({
    title: "test",
    user: "A",
    list: JSON.stringify([
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
])
  })
}).catch((error) => {
  console.error("failed: ", error)
})