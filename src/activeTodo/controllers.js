const ActiveTodo = require("./model");
const User = require("../user/model");

const addActiveTodo = async (req, res) => {
  try {
    if (req.authCheck) {
      const user = await User.findOne({
        where: { username: req.authCheck.username },
      });

      const newActiveTodo = await user.createActiveTodo({
        todo: req.body.todo,
      });

      res.status(201).json({ message: "success", todo: newActiveTodo });
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

const deleteActiveTodo = async (req, res) => {
  try {
    if (req.authCheck) {
      const user = await User.findOne({
        where: { username: req.authCheck.username },
      });

      // line 33 raises this error - sequelize database error: Truncated incorrect DOUBLE value: '[object Object]
      // const deletedTodo = await user.removeActiveTodo(req.body.todo);

      const deletedTodo = await ActiveTodo.destroy({
        where: { id: req.body.todo.id },
      });

      if (deletedTodo > 0) {
        res.status(204).json({ message: "success", deletedTodo: deletedTodo });
        return;
      } else {
        res.status(404).json({ message: "failure, todo not found" });
        return;
      }
    }

    res.status(401).json({ message: "user not authorized" });
  } catch (error) {
    res.status(501).json({
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  addActiveTodo,
  deleteActiveTodo,
};
