const express= require("express")
const router= express.Router()
const asynMiddleware= require("../middlewares/async.middleware");

const {
  signUp,
  login,
  validateToken,
}= require("../controllers/auth.controller");


router.route("/signup").post(asynMiddleware(signUp));
router.route("/login").post(asynMiddleware(login));
router.route("/validate").post(asynMiddleware(validateToken));
module.exports= router;