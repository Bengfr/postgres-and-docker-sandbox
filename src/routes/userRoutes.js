const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getUserByID, updateUser, deleteUser } = require("../controllers/userController")


router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:user_id", getUserByID);
router.put("/user/:user_id", updateUser);
router.delete("/user/:user_id", deleteUser);


module.exports = router
