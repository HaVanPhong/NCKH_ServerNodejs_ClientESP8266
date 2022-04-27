const Joi= require("joi");

const equipmentValidate= Joi.object({
  name: Joi.string().min(3).max(50).required,
  status: Joi.string().min(1).max(1),
});

module.exports= (equip)=> equipmentValidate.validate(equip);