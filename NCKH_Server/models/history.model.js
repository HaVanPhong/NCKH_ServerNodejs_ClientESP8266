const mongoose = require("mongoose");

const historySchema= mongoose.Schema({
  status: {
    type: Number
  },
  equipment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Equipment"
  }
}, {timestamps: true, versionKey: false})

module.exports= mongoose.model("Hiss", historySchema);