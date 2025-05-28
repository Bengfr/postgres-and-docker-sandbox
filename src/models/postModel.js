const pool = require('../config/db')

const getAllPostService = async () => {
    const result = await pool.query("SELECT * FROM aviw_blog_getposts");
    console.log(result)
    return result.rows;
};

const getPostByIdService = async (post_id) => {
    const result = await pool.query("SELECT * FROM blog_posts WHERE post_id = $1", [post_id]);
    return result.rows[0];
};

const createPostervice = async (user_id, created,post_title, post_description, post_content) => {
    const result = await pool.query(
        "INSERT INTO blog_posts (user_id, created, post_title, post_description, post_content) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, created,post_title, post_description, post_content]
    );
    return result.rows[0];
};

const updatePostervice = async (post_id, name, email) => {
    const result = await pool.query(
        "UPDATE blog_posts SET name=$1, email=$2 WHERE post_id=$3 RETURNING *",
        [name, email, post_id]
    );
    return result.rows[0];
};

const deletePostervice = async (post_id) => {
    const result = await pool.query(
        "DELETE FROM blog_posts WHERE post_id = $1 RETURNING *", [post_id]
    );
    return result.rows[0];
};

module.exports = {
    getAllPostService,
    getPostByIdService,
    createPostervice,
    updatePostervice,
    deletePostervice
};