const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Game = require("./models/Product.model");
const { authUser, authRole } = require("./Auth/auth");
const User = require("./models/user.model");

let refreshTokens = [];

app.use(express.json());
app.use(cors());
app.use(setUser);

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.User = User.find((User) => User.id === userId);
  }
  next();
}

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, (err) => {
  if (err) console.error(err);
  console.log("Connected To MongoDB");
});

const generateRefreshToken = (user) => {
  const users = User;
  return jwt.sign(
    {
      name: users.name,
      email: users.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
};

app.post("api/refresh", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json("You are not authenticated!!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }
  jwt.verify(refreshTokens, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err);
    refreshToken = refreshTokens.filter((token) => token !== refreshToken);
  });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
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
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { state: "error", error: "Invalid login" };
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
      },
      process.env.JWTPRIVATEKEY,
      { expiresIn: "30m" }
    );
    const refreshToken = generateRefreshToken(isPasswordValid);
    refreshToken.push(refreshTokens);
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/Products", async (req, res) => {
  // const products = new Game({ title: "GTA V", image: "xxx", price: "5000" });
  try {
    // await products.save();
    res.send("Test Product here");
  } catch (error) {
    console.log(error);
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err) => {
      const user = User;
      if (err) {
        return res.status(403).json("Token is not valid!!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!!");
  }
};

app.post("/api/products", (req, res) => {});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshToken = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("Logged out successful!!");
});

app.get("/admin", authUser, authRole(User.role), async (req, res) => {
  res.send("admin page");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
