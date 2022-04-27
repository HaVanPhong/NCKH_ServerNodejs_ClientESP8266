const Joi= require("joi")

const areaValidate= Joi.object({
  name: Joi.string().min(3).max(30),
  address: Joi.string().min(5).max(50),
  area: Joi.number().min(1),
  n_equipment: Joi.number().min(0)
})

module.exports= (erea)=> areaValidate.validate(erea);