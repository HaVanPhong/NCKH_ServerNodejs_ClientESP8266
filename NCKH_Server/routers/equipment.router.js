const express= require("express");
const router= express.Router();
const asyncMiddleware= require("../middlewares/async.middleware")
const authMiddleware = require("../middlewares/auth.middleware")
const roleMiddleware= require("../middlewares/role.middleware")
const typeRole= require("../constants/typeRole")

const {
  getAllEquipment,
  getAllEquipmentOfArea,
  getEquipmentById,
  createAnEquipment,
  updateAnEquipment,
  deleteAnEquipment
}= require("../controllers/equipment.controller")
router
  .route("/admin")
  .get(
    asyncMiddleware(authMiddleware),
    roleMiddleware(typeRole.ADMIN),
    asyncMiddleware(getAllEquipment)
  )

router
  .route("/:idArea")
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getAllEquipmentOfArea)
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(createAnEquipment)
  )
router
  .route("/:idArea/:idEquip")
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(getEquipmentById)
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(updateAnEquipment)
  )
  .delete(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(deleteAnEquipment)
  )

module.exports= router