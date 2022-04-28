require("dotenv").config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://root:phong123@cluster0.sd0po.mongodb.net/NCKH_Server2?retryWrites=true&w=majority",
  USER_ADMIN: {
    username: "admin",
    password: "admin",
    phone: "0337733234",
    address: "Hà Nội",
    dob: "13/01/2001",
    role: "admin",
  }
};