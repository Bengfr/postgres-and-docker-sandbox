const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserByID, updateUser, deleteUser, loginUser } = require("../controllers/userController")


router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:user_id", getUserByID);
router.put("/user/:user_id", updateUser);
router.delete("/user/:user_id", deleteUser);
router.post("/user/login",loginUser);

module.exports = router
