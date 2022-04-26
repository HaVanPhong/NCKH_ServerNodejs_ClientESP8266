const express= require("express")
const router= express.Router()
const asyncMidleware= require("../middlewares/async.middleware")
const authMidleware= require("../middlewares/auth.middleware")
const roleMiddleware= require("../middlewares/role.middleware")
const typeRole= require("../constants/typeRole")
const {
  getAllArea,
  getAllAreaOfUser,
  createArea,
  updateArea,
  deleteArea,
  getAreaById
}= require("../controllers/area.controller")
const asyncMiddleware = require("../middlewares/async.middleware")

router
  .route("/admin")
  .get(
    asyncMiddleware(authMidleware),
    asyncMiddleware(roleMiddleware(typeRole.ADMIN)),
    asyncMiddleware(getAllArea)
  )

router
  .route("/")
  .get(
    asyncMidleware(authMidleware),
    asyncMidleware(getAllAreaOfUser)
  )
  .post(
    asyncMiddleware(authMidleware),
    asyncMiddleware(createArea)
  )

router
    .route("/:id")
    .get(
      asyncMiddleware(authMidleware),
      asyncMiddleware(getAreaById)
    )
    .patch(
      asyncMiddleware(authMidleware),
      asyncMiddleware(updateArea)
    )
    .delete(
      asyncMiddleware(authMidleware),
      asyncMiddleware(deleteArea)
    )
module.exports= router;