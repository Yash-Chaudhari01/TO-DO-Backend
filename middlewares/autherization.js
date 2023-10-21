const jwt = require('jsonwebtoken');


console.log("At authentication section");
exports.autherization= async(req,res,next)=>{
    
 const token = req.cookies.token;
 
 if(!token){
    return res.status(401).json({
        msg:"Unauthrized user"
    })
}
 try{
const decode = jwt.verify(token,process.env.JWT_SECRET);
req.user= decode.user;
console.log("end");
next();

 }catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
          })
      
    }
}