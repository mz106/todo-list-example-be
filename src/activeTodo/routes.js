const { Router } = require("express");
const todoRouter = Router();

const { addActiveTodo, deleteActiveTodo } = require("./controllers");

const { tokenCheck } = require("../middleware");

todoRouter.post("/activetodos/addtodo", tokenCheck, addActiveTodo);
todoRouter.delete(
  "/activetodos/deleteactivetodo",
  tokenCheck,
  deleteActiveTodo
);
//
todoRouter.get("/activetodo/test", async (req, res) => {
  res.send("its all good");
});

module.exports = todoRouter;
