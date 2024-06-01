const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const validateFields = require("../middlewares/validationFields");

router.post("/register", validateFields(userController.requiredRegistrationFields), userController.registerUser);
router.get("/login",validateFields(userController.requiredLoginFields),  userController.loginUser);

module.exports = router;
