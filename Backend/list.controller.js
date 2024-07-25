const { Sequelize, DataTypes } = require("sequelize");
const dataBaseSecrets = require("../secrets.js");

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

const list = sequelize.define("list", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    list: {
        type: DataTypes.JSON,
        allowNull: false
    }
})

sequelize.sync().then(() => {
    /*
  list.create({
    title: "test 2",
    user: "A",
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
  }).then(res => {
    console.log(res)
  }).catch((error) => {
    console.error('error')
  })
    */
   list.findAndCountAll({
    where: {
        user: "A"
    }
   }).then(res => {
    console.log(res)
   })
}).catch((error) => {
  console.error("error")
})