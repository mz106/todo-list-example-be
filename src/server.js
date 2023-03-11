require("dotenv").config();

const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const User = require("./user/model");
const ActiveTodo = require("./activeTodo/model");
const DoneTodo = require("./doneTodo/model");

const userRouter = require("./user/routes");
const activeTodoRouter = require("./activeTodo/routes");
const doneTodoRouter = require("./doneTodo/routes");

const app = express();

app.use(cors());
app.use(express.json());

const syncTables = async () => {
  User.hasMany(ActiveTodo);
  ActiveTodo.belongsTo(User);

  User.hasMany(DoneTodo);
  DoneTodo.belongsTo(User);

  User.sync();
  ActiveTodo.sync();
  DoneTodo.sync();
};

syncTables();

app.use(userRouter);
app.use(activeTodoRouter);
app.use(doneTodoRouter);

app.get("/health", (req, res) =>
  res.status(200).json({ message: "API is healthy" })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
