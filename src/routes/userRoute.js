const express = require("express");
const { register, login } = require("../controller/userController");
const { validation } = require("../middleware/validation");
const userSchema = require("../schema/userSchema");
const router = express.Router();

router.post("/register", validation(userSchema.registerSchema), register);
router.post("/login", validation(userSchema.loginSchema), login);

module.exports = router;
