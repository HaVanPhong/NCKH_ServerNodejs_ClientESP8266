const Joi = require("joi");

const typeRole = require("../constants/typeRole");

const userValidate = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: Joi.string().min(8).max(12),
  address: Joi.string().min(5).max(50),
  dob: Joi.string().min(3).max(20),
  role: Joi.string().valid(...Object.values(typeRole)),
});

module.exports = (user) => userValidate.validate(user);