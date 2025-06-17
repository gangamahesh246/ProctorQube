const express = require("express");
const router = express.Router();
const {
  LoginController,
  RegisterController,
  ForgotPasswordController,
} = require("../controllers/LoginController"); 

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.post("/forgot-password", ForgotPasswordController);

module.exports = router;
