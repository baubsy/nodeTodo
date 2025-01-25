const {Sequelize, DataTypes} = require("sequelize");
const dataBaseSecrets = require("../../secrets.js");

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

const List = sequelize.define("lists", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    list: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

sequelize.sync().then(() => {
  console.log('lists table create');
}).catch((error) => {
  console.error("failed: ", error)
})

module.exports = List;