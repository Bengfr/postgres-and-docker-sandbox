const jwt = require('jsonwebtoken');

const { getAllUsersService, createUserService, getUserByIdService, updateUserService, deleteUserService, loginUserService } = require("../models/userModel")
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const createUser = async (req, res, next) => {
    const {username, email, password_unHashed} = req.body;
    try {
        const newUser = await createUserService(username, email, password_unHashed);

        // If the client expects HTML (browser form), redirect
        if (req.accepts('html')) {
            return res.redirect('/login.html');
        }
        // Otherwise, send JSON (API/AJAX)
        handleResponse(res, 201, "User created successfully", newUser);
    } catch (err) {
        next(err);
    }
}

const getAllUsers = async (req, res, next) =>{
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "User fetched successfully", users)
    } catch (err) {
        next(err);
    }
}

const getUserByID = async (req, res, next) =>{
    try {
        const users = await getUserByIdService(req.params.user_id);
        if(!users) return handleResponse(res,404, "User not found")
        handleResponse(res, 200, "User fetched successfully", users)
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) =>{
    const {name, email} = req.body;
    try {
        const updatedUser = await updateUserService(req.params.user_id, name, email);
        if(!updatedUser) return handleResponse(res,404, "User not found")
        handleResponse(res, 200, "User updated successfully", updatedUser)
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) =>{
    try {
        const deletedUser = await deleteUserService(req.params.user_id);
        if(!deletedUser) return handleResponse(res,404, "User not found")
        handleResponse(res, 200, "User deleted successfully", deletedUser)
    } catch (err) {
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await loginUserService(email, password);

        if (!user) {
            return handleResponse(res, 401, "Invalid email or password");
        }

        // Create JWT token here
        const token = jwt.sign(
            { user_id: user.user_id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        handleResponse(res, 200, "Login successful", { user, token });
    } catch (err){
        next(err);
    }
}

module.exports = {
    handleResponse,
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
    loginUser
};