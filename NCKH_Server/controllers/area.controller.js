const errorResponse= require("../response/errorResponse")
const AreaModel= require("../models/area.model")
const ereaValidate= require("../validation/area.validation")

module.exports= {
  getAllArea: async (req, res)=>{
    try {
      let areas= await AreaModel.find().populate("owner");
      if (areas.length==0){
        return res.status(404).json(new errorResponse(404, "Không có kết quả nào được tìm thấy"))
      }
      return res.status(200).json(areas);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  createArea: async (req, res)=>{
    try {
      let {...body} = req.body;
      const {value, error}= ereaValidate(body);
      if (error){
        return res.status(400).json(new errorResponse(400, error.message))
      }

      //req.user lấy từ authMiddelware
      value.owner= req.user._id;

      let area= await AreaModel.create(value);
      return res.status(201).json(area);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  getAllAreaOfUser: async (req, res)=>{
    try {
      let idUser= req.user._id;
      let areas= await AreaModel.find({owner: idUser}).populate("owner");
      if (areas.length==0){
        return res.status(404).json(new errorResponse(404, "Không có kết quả nào được tìm thấy"))
      }
      return res.status(200).json(areas);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message));
    }
  },
  updateArea: async(req, res)=>{
    try {
      let {...body} = req.body;
      let area= await AreaModel.findOneAndUpdate({_id: req.params.id, owner: req.user._id}, body, {new: true})
      return res.status(201).json(area)
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  deleteArea: async(req, res)=>{
    try {
      let id= req.params.id
      let area= await AreaModel.findOne({_id: id, owner: req.user._id});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Không tìm thấy Area id: "+ id))
      }
      await AreaModel.findOneAndDelete(area);
      return res.status(200).json(area);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  getAreaById: async(req, res)=>{
    try {
      let area= await AreaModel.findOne({_id: req.params.id, owner: req.user._id})
      if (!area){
        return res.status(404).json(new errorResponse(404, "Không có kết quả nào được tìm thấy"))
      }
      return res.status(200).json(area);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  }
}