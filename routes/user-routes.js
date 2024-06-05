const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const validateFields = require("../middlewares/validationFields");
const { authorizeAdmin } = require("../middlewares/adminAuth");
const { auth } = require("../middlewares/auth");

router.post("/register", validateFields(userController.requiredRegistrationFields), userController.registerUser);
router.post("/login",validateFields(userController.requiredLoginFields),  userController.loginUser);
router.delete("/unregister/:id",  auth, userController.removeUser  );
router.delete("/unregisterAll/",  auth, userController.removeAllUsers   );
router.get("/users", auth, userController.getAllUsers )
module.exports = router;
