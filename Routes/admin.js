const express = require('express');
const router = express.Router()
const adminController = require("../Controllers/adminController")

router.post("/login",adminController.login)
router.post("/auth",adminController.auth)
router.get("/get_users",adminController.getUsers)

module.exports = router