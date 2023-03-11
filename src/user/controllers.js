const User = require("./model");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  console.log("adduser hit");
  try {
    const user = await User.create({
      username: req.body.username,
      hashPass: req.body.password,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY
    );

    const successResponse = {
      message: "success",
      user: {
        id: user.id,
        username: user.username,
        token: token,
      },
    };
    console.log(successResponse);
    res.status(201).json(successResponse);
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: error.message,
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    if (req.authCheck) {
      const user = await User.findOne({
        where: { username: req.authCheck.username },
      });

      const userActiveTodos = await user.getActiveTodos();
      console.log(userActiveTodos);

      const userDoneTodos = await user.getDoneTodos();

      res.status(201).json({
        message: "success",
        user: { username: req.authCheck.username },
        activeTodos: userActiveTodos,
        doneTodos: userDoneTodos,
      });
      return;
    }

    const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
    res.status(201).json({
      message: "success",
      user: { username: req.user.username, token: token },
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  addUser,
  login,
};
