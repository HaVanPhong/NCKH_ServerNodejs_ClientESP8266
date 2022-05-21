const EquipmentModel= require("../models/equipment.model")
const AreaModel= require("../models/area.model")

const errorResponse= require("../response/errorResponse")
const equipmentValidate= require("../validation/equipment.validate")

module.exports= {
  getAllEquipment: async(req, res)=>{
    try {
      let equips= await EquipmentModel.find().populate("area");
      if (equips.length==0){
        return res.status(404).json(new errorResponse(404, "Không có thiết bị nào trong CSDL"))
      }
      return res.status(200).json(equips)
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  getAllEquipmentOfArea: async(req, res)=>{
    try {
      let idArea= req.params.idArea;
      let idUser= req.user._id;
      //kiểm tra khu vực idArea có thuộc sở hữu của tài khoản idUser hay không
      let area= await AreaModel.findOne({_id: idArea, owner: idUser});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Area: "+idArea+" không tồn tại trong User: "+ idUser))
      }

      //lấy ra các thiết bị trong khu vực
      let equips= await EquipmentModel.find({area: idArea}).populate("area")

      if (equips.length==0){
        return res.status(404).json(new errorResponse(404, "Khu vực này chưa có thiết bị nào"))
      }

      return res.status(200).json(equips)
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  getEquipmentById: async(req, res)=>{
    try {
      let idArea= req.params.idArea;
      let idEquip= req.params.idEquip;
      let idUser= req.user._id;
      //kiểm tra khu vực idArea có thuộc sở hữu của tài khoản idUser hay không
      let area= await AreaModel.findOne({_id: idArea, owner: idUser});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Area: "+idArea+" không tồn tại trong User: "+ idUser))
      }

      let equip= await EquipmentModel.findOne({area: idArea, _id: idEquip}).populate("area")

      if (!equip){
        return res.status(404).json(new errorResponse(404, "Khu vực này chưa có thiết bị nào"))
      }

      return res.status(200).json(equip)
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  createAnEquipment: async(req, res)=>{
    try {
      let idArea= req.params.idArea;
      let {...body}= req.body;
      const {value, error}= equipmentValidate(body);
      if (!error){
        return res.status(401).json(new errorResponse(401, error.message))
      }
      let area= await AreaModel.findOne({_id: idArea, owner: req.user._id});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Không tìm thấy area: "+ idArea))
      }
      let areaUpdate_n_equipment= await AreaModel.findOneAndUpdate({_id: idArea}, {n_equipment: area.n_equipment+1}, {new: true})
      if (!areaUpdate_n_equipment){
        return res.status(403).json(new errorResponse(403, "Không thể update số lượng thiết bị của khu vực"))
      }

      let isExistsLed= await EquipmentModel.findOne({led: value.led, area: idArea});
      if (isExistsLed){
        return res.status(403).json(new errorResponse(403, "Chân led "+ value.led+ " đã được sử dụng"));
      }

      value.area= areaUpdate_n_equipment._id;

      let equipment= await EquipmentModel.create(value);
      return res.status(201).json(equipment);
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  updateAnEquipment: async(req, res)=>{
    try {
      let idArea= req.params.idArea;
      let idEquip= req.params.idEquip;
      let idUser= req.user._id;
      let {...body}= req.body;
      //kiểm tra khu vực idArea có thuộc sở hữu của tài khoản idUser hay không
      let area= await AreaModel.findOne({_id: idArea, owner: idUser});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Area: "+idArea+" không tồn tại trong User: "+ idUser))
      }
      
      let equip= await EquipmentModel.findOneAndUpdate({_id: idEquip}, body, {new: true})
      if (!equip){
        return res.status(500).json(new errorResponse(500, "Update equipment fail"))
      }

      return res.status(200).json(equip);
      
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  },
  deleteAnEquipment: async(req, res)=>{
    try {
      let idArea= req.params.idArea;
      let idEquip= req.params.idEquip;
      let idUser= req.user._id; 
      //kiểm tra khu vực idArea có thuộc sở hữu của tài khoản idUser hay không
      let area= await AreaModel.findOne({_id: idArea, owner: idUser});
      if (!area){
        return res.status(404).json(new errorResponse(404, "Area: "+idArea+" không tồn tại trong User: "+ idUser))
      }
      let equip= await EquipmentModel.findOne({area: idArea, _id: idEquip});
      if (!equip){
        return res.status(404).json(new errorResponse(404, "Không tìm thấy thiết bị: "+ idEquip))
      }
      return res.status(200).json(await EquipmentModel.findOneAndDelete({_id: idEquip}));
    } catch (error) {
      return res.status(500).json(new errorResponse(500, error.message))
    }
  }


}

