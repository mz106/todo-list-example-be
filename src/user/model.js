const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const User = connection.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashPass: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = User;
