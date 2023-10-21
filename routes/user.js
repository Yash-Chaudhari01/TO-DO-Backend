const express  = require('express');
const router = express.Router();
console.log("At route section");
const {autherization}= require('../middlewares/autherization')
const {register,login,logout,about}=require('../controllers/userController')

router.post('/register',register);

router.post('/login',login);

router.get('/logout',autherization,logout);
router.get('/about',autherization,about);

//router.get('/updatedetails',updatedetails);

// router.get('/updatepassword',updatepassword);

// router.delete('/deleteuser',deleteuser);

module.exports =router;