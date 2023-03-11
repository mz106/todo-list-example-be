const User = require("../user/model");
const ActiveTodo = require("../activeTodo/model");
const DoneTodo = require("./model");

const addDoneTodo = async (req, res) => {
  console.log("adddonetodo hit");
  try {
    if (req.authCheck) {
      const user = await User.findOne({
        where: { username: req.authCheck.username },
      });
      console.log("adddonetodo user: ", user);
      const deletedTodo = await ActiveTodo.destroy({
        where: { todo: req.body.todo.todo },
      });
      console.log("adddonetodo deletedtodo: ", deletedTodo);
      // below not working - investigate
      //   const deletedActiveTodo = await user.removeActiveTodo(
      //     req.body.activeTodo
      //   );

      const newDoneTodo = await user.createDoneTodo({
        todo: req.body.todo.todo,
      });

      console.log("adddonetodo newdonetodo: ", newDoneTodo);

      res.status(201).json({ message: "success", newDoneTodo });
      return;
    }

    res.status(401).json({ message: "user not authorized" });
  } catch (error) {
    res.status(501).json({
      message: error.message,
      error: error,
    });
  }
};

const deleteDoneTodo = async (req, res) => {
  console.log("!!!!!! deletedDoneTodo hit: ", req.body);
  try {
    if (req.authCheck) {
      const user = await User.findOne({
        where: { username: req.authCheck.username },
      });

      const deletedDoneTodo = await DoneTodo.destroy({
        where: { todo: req.body.todo.todo },
      });
      console.log(deletedDoneTodo);
      if (deletedDoneTodo > 0) {
        res
          .status(204)
          .json({ message: "success", deletedTodo: deletedDoneTodo });
        return;
      } else {
        res.status(404).json({ message: "failure, todo not found" });
        return;
      }
      res.status(401).json({ message: "user not authorized" });
    }
  } catch (error) {
    res.status(501).json({
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  addDoneTodo,
  deleteDoneTodo,
};
