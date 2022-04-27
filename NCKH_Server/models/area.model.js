const mongoose = require("mongoose")

const areaSchema= mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  area: {
    type: Number
  },
  n_equipment:{
    type: Number,
    default: 0
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }

}, {timestamps: true, versionKey: false})

module.exports= mongoose.model("Area", areaSchema, "Areas");