const { getAllPostService, createPostervice, getPostByIdService, updatePostervice, deletePostervice } = require("../models/postModel")
const handleResponse = require("./userController").handleResponse;

const createPost = async (req, res, next) =>{
    const {user_id, post_date,post_title, post_description, post_content} = req.body;
    try {
        const newPost = await createPostervice(user_id, post_date,post_title, post_description, post_content);
        handleResponse(res, 201, "Post created successfully", newPost)
    } catch (err) {
        next(err);
    }
}

const getAllPosts = async (req, res, next) =>{
    try {
        const post = await getAllPostService();
        handleResponse(res, 200, "Post fetched successfully", post)

    } catch (err) {
        next(err);
    }
}

const getPostByID = async (req, res, next) =>{
    try {
        const users = await getPostByIdService(req.params.user_id);
        if(!users) return handleResponse(res,404, "User not found")
        handleResponse(res, 200, "User fetched successfully", users)
    } catch (err) {
        next(err);
    }
}

const updatePost = async (req, res, next) =>{
    const {name, email} = req.body;
    try {
        const updatedPost = await updatePostervice(req.params.post_id, updated, post_title, post_description, post_content);
        if(!updatedPost) return handleResponse(res,404, "post not found")
        handleResponse(res, 200, "post updated successfully", updatedPost)
    } catch (err) {
        next(err);
    }
}

const deletePost = async (req, res, next) =>{
    try {
        const deletedUser = await deletePostervice(req.params.user_id);
        if(!deletedUser) return handleResponse(res,404, "User not found")
        handleResponse(res, 200, "User deleted successfully", deletedUser)
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostByID,
    updatePost,
    deletePost
};