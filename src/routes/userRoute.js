const express = require("express");
const {
  register,
  login,
  sendVerification,
  verifikasiAccount,
  getProfile,
  updatePassword,
} = require("../controller/userController");
const validation = require("../middleware/validation");
const userSchema = require("../schema/userSchema");
const EmailController = require("../controller/EmailController");
const Authorization = require("../middleware/authorization");
const router = express.Router();

router.post("/register", validation(userSchema.registerSchema), register);
router.post("/login", validation(userSchema.loginSchema), login);
router.get("/profile", Authorization, getProfile);
router.get("/verify", verifikasiAccount);
router.post("/verify-send", Authorization, sendVerification);
router.post("/update-password", Authorization, updatePassword);
module.exports = router;
