const express= require("express");

const router= express.Router();

const {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById
}= require("../controllers/user.controller")

const asynMiddleware= require("../middlewares/async.middleware")
const authMiddleware= require("../middlewares/auth.middleware")
const roleMiddelware= require("../middlewares/role.middleware")

const typeRole= require("../constants/typeRole");
const asyncMiddleware = require("../middlewares/async.middleware");

router
  .route("/")
  .get(
    asynMiddleware(authMiddleware),
    asynMiddleware(roleMiddelware(typeRole.ADMIN)),
    asynMiddleware(getAllUser)
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddelware(typeRole.ADMIN)),
    asynMiddleware(createUser)
  )

router
  .route("/:id")
  .get(
    asyncMiddleware(authMiddleware),
    asynMiddleware(roleMiddelware(typeRole.ADMIN)),
    asynMiddleware(getUserById)
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asynMiddleware(updateUser)
  )  
  .delete(
    asyncMiddleware(authMiddleware),
    asynMiddleware(roleMiddelware(typeRole.ADMIN)),
    asynMiddleware(deleteUser)
  )    

module.exports= router;


