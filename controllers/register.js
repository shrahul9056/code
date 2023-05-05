const { MongoClient} = require('mongodb');
const connectDB = require('../routes/atlas');

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const db = await connectDB();
  const { email, password: Npassword } = req.body;
  if (!email || !Npassword)
    return res.json({
      status: "error", error: "Please enter your email and password"});
  else {
    try {
      const existingUser = await db.collection('users').findOne({email : email})
      //const existingUser = await Employee.findOne({ email: email });
      if (existingUser)
        return res.json({
          status: "error",
          error: "Email has already been registered",
        });
      else {
        const password = await bcrypt.hash(Npassword, 8);
        const newUser = { email: email, password: password };
        await db.collection('users').insertOne(newUser);
        return res.json({
          status: "success",
          success: "User has been registered",
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        status: "error",
        error: "Something went wrong",
      });
    }
  }
};

module.exports = register;
