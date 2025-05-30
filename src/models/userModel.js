const pool = require('../config/db')
const argon2 = require('argon2')

const getAllUsersService = async () => {
    const result = await pool.query("SELECT user_id, username, email, password_hash, created FROM blog_users");
    return result.rows;
};

const getUserByIdService = async (user_id) => {
    const result = await pool.query("SELECT * FROM blog_users WHERE user_id = $1", [user_id]);
    return result.rows[0];
};

const createUserService = async (username, email, password_unHashed) => {
    let password_hash;

    try {
        password_hash = await argon2.hash(password_unHashed);
    } catch (err) {
        console.log(err)
    }

    const result = await pool.query(
        "INSERT INTO blog_users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password_hash]
    );
    return result.rows[0];
};

const updateUserService = async (user_id, name, email) => {
    const result = await pool.query(
        "UPDATE blog_users SET name=$1, email=$2 WHERE user_id=$3 RETURNING *",
        [name, email, user_id]
    );
    return result.rows[0];
};

const deleteUserService = async (user_id) => {
    const result = await pool.query(
        "DELETE FROM blog_users WHERE user_id = $1 RETURNING *", [user_id]
    );
    return result.rows[0];
};

const loginUserService = async (email, loginPassword) => {
    const result = await pool.query(
        "SELECT user_id, username, email, password_hash, created FROM blog_users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        // No user found
        return null;
    }
    
    const user = result.rows[0];
    const passwordValid = await argon2.verify(user.password_hash, loginPassword);
    if (!passwordValid) {
        // Password does not match
        return null;
    }

    // Optionally, remove password_hash before returning
    delete user.password_hash;
    return user;
};

module.exports = {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
    loginUserService
};