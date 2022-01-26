const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const userLogin = async (req, res, role) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { state: "error", error: "Invalid login" };
  }

  if (user.role != role) {
    return res.status(404).json({
      message: "You not allow to visit this page!!",
      success: false,
    });
  }

  if (user.role === "admin") {
    return res.status(200).json({
      message: "Login as Admin!!",
      success: false,
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWTPRIVATEKEY,
      { expiresIn: "2 days" }
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

const userRegister = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
};



module.exports = {
  userLogin,
  userRegister,
};
