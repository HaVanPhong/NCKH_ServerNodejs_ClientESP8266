const mongoose = require("mongoose");

const equipmentSchema= mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "0"
  }
  ,
  img: {
    type: String
  }
  ,
  location: {
    type: String
  },
  area: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Area"
  }
  
}, {timestamps: true, versionKey: false})

module.exports= mongoose.model("Equipment", equipmentSchema, "Equipments");