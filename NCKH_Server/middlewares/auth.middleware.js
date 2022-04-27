const configuration= require("../configs/configuration");
const jwt= require("jsonwebtoken");
const UserModel= require("../models/user.model");
const errorResponse= require("../response/errorResponse");

module.exports= async(req, res, next)=>{
  try {
    const {authorization}= req.headers;
    // console.log(authorization)
    if (!authorization || !authorization.startsWith("Bearer ")){
      return res.status(403).json(new errorResponse(403, "Unauthorized"));
    }
    const token= authorization.split(" ")[1];
    const decode= jwt.verify(token, configuration.JWT_SECRET);
    const user= await UserModel.findById(decode._id);
    if (!user){
      return res.status(401).json(new errorResponse(401, "Unauthorized"));
    }
    req.user= user;
    next();
  } catch (error) {
    // console.log(error)
    return res.status(500).json(new errorResponse(500, error.message));
  }
}