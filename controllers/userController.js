

const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.register = async (req, res) => 
{
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedpassword,
    });

    await user.save();

    const payload = {
      user: user._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.cookie('token', token, { httpOnly: true, expiresIn: 360000 });

    const { password: pass, ...rest } = user._doc;

    return res.status(201).json({
      rest,
      message: "User Registered Successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid password" })
    }

    const payload = {
      user: user._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.cookie('token', token, { httpOnly: true, expiresIn: 360000 });

    const { password: pass, ...rest } = user._doc;

    return res.status(201).json({
      rest,
      message: "User logged in Successfully",
    });


  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}




exports.logout = async (req, res) => {
  try {
res.clearCookie("token");
res.status(200).json({
  message:"log out  successfully"
})

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error"
    })

  }
}

exports.about= async(req,res)=>{
  try{
  const user =await User.findById(req.user);
  if(!user){
    return res.status(404).json({
      message:"User Is Not Found"
    })
  }
  const {password:pass, ...rest}=user._doc;
  return res.status(200).json({
    success:true,
    user
  })

  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    })

  }
}

exports.updateProfile=async(req,res)=>{
  try{
  const {name,email}=req.body;
  let user = await User.findById(req.user);
console.log(user);
  if(!user){
    return res.status(404).json({message:"User Is not Found"});
  }
  let exist = await User.findOne({email});

  if(exist && exist._id.toString() !== user._id.toString()){
    return res.status(404).json({
      message:"Email Already Exist"
    })
  }
user.name= name;
user.email=email,
 
await  user.save();
const {password:pass ,...rest} =user._doc;
return res.status(200).json({
  message:"User Updated Succesfully",
  user
})


  }catch(err){
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}