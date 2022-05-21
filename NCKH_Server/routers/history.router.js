const express= require("express");

const router= express.Router()
const asyncMiddleware= require("../middlewares/async.middleware");
const authMidleware= require("../middlewares/auth.middleware");
const {
  getAllHistory,
  getAllHistoryOfEquipment,
}= require("../controllers/history.controller");

router
  .route("")
  .get(
    asyncMiddleware(authMidleware), 
    asyncMiddleware(getAllHistory)
  );

router
  .route("/:id/:page")  
  .get(
    asyncMiddleware(authMidleware), 
    asyncMiddleware(getAllHistoryOfEquipment)
  )

module.exports  = router;