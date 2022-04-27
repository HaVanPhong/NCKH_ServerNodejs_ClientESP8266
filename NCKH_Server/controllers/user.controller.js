const { use } = require("bcrypt/promises");
const UserModel= require("../models/user.model")
const errorResponse= require("../response/errorResponse")
module.exports={
  getAllUser: async (req, res, next)=>{
    let users= await UserModel.find();
    return res.status(200).json(users);
  },
  createUser: async (req, res, next)=>{
    try {
      let {...body}= req.body;
      const {value, error}= userValidate(body);
      if (error){
        return res.status(400).json(new errorResponse(400, error.message));
      }
      let user= await UserModel.create(value);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message));
    }
  },
  updateUser: async (req, res, next)=>{
    try {
      let id= req.params.id;
      let user= await UserModel.findOneAndUpdate({_id: id}, req.body, {new: true});
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message));
    }
  },
  deleteUser: async (req, res, next)=>{
    try {
      let id= req.params.id;
      let user= await UserModel.findById(id);
      if (!user){
        return res.status(404).json(new errorResponse(404, "Không tìm thấy id: "+ id))
      }
      await UserModel.findByIdAndDelete({_id: id});
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message));
    }
  },
  getUserById: async (req, res, next)=>{
    try {
      let id = req.params.id;
      let user= await UserModel.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message));
    }
  }
}