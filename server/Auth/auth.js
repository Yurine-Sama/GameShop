const User = require("../models/user.model");

function authUser(req, res, next) {
  if (req.User == null) {
    res.status(403);
    return res.send("You need to sign in");
  }

  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.User.role !== role) {
      res.status(401);
      return res.send("Not Allowed");
    }
    next();
  };
}


module.exports = {
  authUser,
  authRole,
};
