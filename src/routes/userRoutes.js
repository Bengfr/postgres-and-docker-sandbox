const express = require('express');

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/user/:User_Id", getUserByID);
router.pust("/user/:User_Id", updateUser);
router.delete("/user/:User_Id", deleteUser);


module.exports = router
