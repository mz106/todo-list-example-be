const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../user/model");

const saltRounds = 10;

const hashPass = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      console.log(req.body);
      next();
    } else {
      res.status(500).json({ message: "password not present" });
    }
  } catch (error) {
    res.status(501).send({ errormessage: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { username: req.body.username } });
    const passCheck = await bcrypt.compare(
      req.body.password,
      req.user.hashPass
    );

    if (req.user && passCheck) {
      next();
    } else {
      throw new Error("Incorrect username/password");
    }
  } catch (error) {
    res.status(501).send({ errormessage: error.message, error: error });
  }
};

const tokenCheck = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    if (!req.header("Authorization")) {
      throw new Error("no token passed");
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findByPk(decodedToken.id);

    if (user) {
      req.authCheck = user;
      next();
    } else {
      throw new Error("user not authorized");
    }
  } catch (error) {
    res.status(501).send({ errormessage: error.message, error: error });
  }
};

module.exports = {
  hashPass,
  comparePass,
  tokenCheck,
};
