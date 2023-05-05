const jwt= require("jsonwebtoken");
const connect = require('../routes/atlas');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");

const loggedIn = async (req, res, next) => {
  const db = await connect();
  if (!req.cookies.UserRegistered) {
    res.redirect("/login");
    return;
  }

  try {
    const decoded = jwt.verify(req.cookies.UserRegistered, process.env.JWT_SECRET);
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id)});
    if (!user) {
      res.redirect("/login");
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};

module.exports = loggedIn;
