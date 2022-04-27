const configuration= require("../configs/configuration");

const bcrypt= require('bcrypt');
const jwt= require("jsonwebtoken");
const UserModel= require("../models/user.model");
const userValidate= require("../validation/user.validation");
const errorResponse= require("../response/errorResponse");
const typeRole= require("../constants/typeRole");


module.exports={
  login: async (req, res, next)=>{
    try {
      const {username, password}= req.body;
      const user= await UserModel.findOne({username});
      if (!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json(new errorResponse(401, "Tài khoản hoặc mật khẩu không chính xác"));
      }
      const token = jwt.sign(
       {
          _id: user._id, 
          username: user.username,
          role: user.role
        },
        configuration.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      )
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        jwt: token
      })
    } catch (error) {
      console.log(error.message)
      return res.tatus(500).json(new errorResponse(500, error.message));
    }
  },
  signUp: async (req, res, next)=>{
    try {
      const {...body}= req.body;
      body.role= typeRole.USER;
      const {value, error}= userValidate(body);
      if (error){
        return res.status(400).json(new errorResponse(400, error.message));
      }

      const user= await UserModel.create(value);
      
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          role: user.role
        },
        configuration.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        jwt: token,
      });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(new errorResponse(500, error.message));
    }
  }
  ,
  validateToken: async (req, res) => {
    try {
      const token = req.body.jwt;
  
      const decode = jwt.verify(token, configuration.JWT_SECRET);
  
      const user = await UserModel.findById(decode._id);
  
      if (!user) {
        return res.status(403).json(new errorResponse(403, "Invalid token"));
      }
      const newToken = jwt.sign(
        { 
          username: user.username, 
          _id: user._id, 
          role: user.role 
        },
        configuration.JWT_SECRET,
        { expiresIn: "1d" }
      );
    
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        jwt: newToken,
      });
    } catch (error) {
      console.log(error.message)
      return res.status(500).json(new errorResponse(500, error.message))
    }
  }
}

