const mongoose = require("mongoose");

const equipmentSchema= mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  led: {
    type: Number,
    default: 14
  },
  status: {
    type: Number,
    default: 0
  }
  ,
  img: {
    type: String,
    default: "https://res.cloudinary.com/djowq0mq4/image/upload/v1651150019/e_ywc7le.jpg"
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