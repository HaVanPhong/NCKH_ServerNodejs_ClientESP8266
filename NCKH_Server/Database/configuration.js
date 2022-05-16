require("dotenv").config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/nckh",
  USER_ADMIN: {
    username: "admin",
    password: "admin",
    phone: "0337733234",
    address: "Hà Nội",
    dob: "13/01/2001",
    role: "admin",
  },
};
