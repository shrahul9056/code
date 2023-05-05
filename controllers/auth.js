const express=require("express");
const register = require("./register");
const login = require("./login");
const employee = require("./employee");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/employee",employee);


module.exports = router;
