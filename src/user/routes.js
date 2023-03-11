const { Router } = require("express");

const userRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/index");
const { addUser, login } = require("./controllers");

userRouter.post("/users/register", hashPass, addUser);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/authcheck", tokenCheck, login);

module.exports = userRouter;
