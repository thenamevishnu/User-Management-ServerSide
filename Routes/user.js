const express = require('express');
const router = express.Router()
const userController = require("../Controllers/userControllers");
const upload = require('../Middleware/Multer');

router.post("/",userController.authentication)
router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.post("/profile",upload.single("image"),userController.profile)

module.exports = router