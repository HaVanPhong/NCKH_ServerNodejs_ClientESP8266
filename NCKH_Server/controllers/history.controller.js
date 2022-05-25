const errorResponse= require("../response/errorResponse")
const HistoryModel= require("../models/history.model");

module.exports={
  getAllHistory: async(req, res)=>{
    try {
      let his= await HistoryModel.find().populate("equipment");
      if (his.length==0){
        return res.status(404).json(new errorResponse(404, "Notfound any history"));
      }
      return res.status(200).json(his);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  getAllHistoryOfEquipment: async(req, res)=>{
    try {
      let perPage= 30;
      let page= req.params.page || 1;
      let idEquip= req.params.id;
      let his= await HistoryModel.find({equipment: idEquip})
        .populate("equipment")
        .skip((perPage*page)-perPage)
        .limit(perPage)
        .sort('-createdAt')
        .exec();
      if (his.length==0){
        return res.status(404).json(new errorResponse(404, "Notfound any history"));
      } else {
        return res.status(200).json(his);
      }      
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  
}