const jwt = require("jsonwebtoken");
const connect = require('../routes/atlas');
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const db = await connect();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: "error",
      error: "Please enter your email and password"
    });
  } else {
    try {
      const user = await db.collection('users').findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({
          status: "error",
          error: "Incorrect email or password"
        });
      } else {
        const token = jwt.sign(
          { id: user._id.toString() },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES }
        );

        const cookieOptions = {
          expiresIn: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };

        res.cookie("UserRegistered", token, cookieOptions);
        return res.json({
          status: "success",
          success: "User has been logged in"
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        status: "error",
        error: "Something went wrong"
      });
    }
  }
};

module.exports = login;
