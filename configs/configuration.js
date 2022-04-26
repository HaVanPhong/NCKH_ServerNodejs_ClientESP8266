require("dotenv").config();

module.exports={
  PORT: process.env.PORT || 8082,
  SALT_ROUNDS: +process.env.SALT_ROUNDS || 10,
  JWT_SECRET: process.env.JWT_SECRET || "abcxyz",
}