const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserByID, updateUser, deleteUser } = require("../controllers/userController")


router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:userid", getUserByID);
router.put("/user/:userid", updateUser);
router.delete("/user/:userid", deleteUser);


module.exports = router
