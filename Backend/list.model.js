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
    }
})

sequelize.sync().then(() => {
  console.log("list table made");
}).catch((error) => {
  console.error("error")
})