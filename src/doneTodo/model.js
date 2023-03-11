const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const DoneTodo = connection.define("DoneTodo", {
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = DoneTodo;
