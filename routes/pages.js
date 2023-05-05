const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
//const employee = require("../controllers/employee");
const showemployee = require("../controllers/showemployee");
const deleteEmp = require("../controllers/deleteEmp");
const editEmp = require("../controllers/editEmp");
const update = require("../controllers/update");

const router = express.Router();




router.get('/Employee/search', loggedIn,async (req, res) => {
  try {
    const userData = await showemployee('', '');
    res.render('search', { title: 'search', userData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving employee data');
  }
});
router.get('/Employee/searching', loggedIn, async (req, res) => {
  const name = req.query.name || '';
  const mobile = req.query.mobile || '';
  const data = await showemployee(name, mobile);
  res.send(data);
});

router.get('/Employee/delete',deleteEmp,(req,res)=>{
  res.redirect('/Employee/search')

})

router.get('/Employee/edit', loggedIn, editEmp, (req, res) => {
 //console.log(req.employee._id.toString()); // "644bbad02a19f2c42b1303ab"  ->fixed

  res.render('update', { user: req.employee });
});



router.put("/employee/update", update);


router.get("/",loggedIn, (req,res)=>{
    if(req.user){
        res.render("index",{status:"loggedIn", user:req.user});
    }else{
    res.render("index",{status:"no", user:"nothing"});
    }
})

router.get("/register",(req,res)=>{
    res.sendFile("register.html",{root: "./public"});
})

router.get("/login",(req,res)=>{
    res.sendFile("login.html",{root: "./public"});
})    
router.get("/logout",logout);
router.get("/employee",loggedIn,(req,res)=>{
    res.sendFile("employee.html",{root: "./public"});
}) 
module.exports=router;