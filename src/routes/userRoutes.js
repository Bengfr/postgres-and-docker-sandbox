const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserByID, updateUser, deleteUser } = require("../controllers/userController")


router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:User_Id", getUserByID);
router.post("/user/:User_Id", updateUser);
router.delete("/user/:User_Id", deleteUser);


module.exports = router
