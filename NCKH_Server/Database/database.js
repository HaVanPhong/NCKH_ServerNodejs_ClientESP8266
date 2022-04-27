const configuration = require("./configuration");
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(configuration.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let ad = await UserModel.findOne({ username: "admin" });
    if (!ad) {
      await UserModel.create(configuration.USER_ADMIN);
    }
    console.log("Kết nối db thành công");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
