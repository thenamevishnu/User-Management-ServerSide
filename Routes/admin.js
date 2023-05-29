const express = require('express');
const router = express.Router()
const adminController = require("../Controllers/adminController")

router.post("/login",adminController.login)
router.post("/auth",adminController.auth)
router.get("/get_users",adminController.getUsers)
router.post("/edit_user",adminController.editUser)
router.post("/delete_user",adminController.deleteUser)

module.exports = router