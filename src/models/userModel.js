
const 

getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM blog_users");
    return result.rows;
};

getUserByIdService = async (userId) => {
    const result = await pool.query("SELECT * FROM blog_users WHERE userId = $1", [userId])
    return result.row[0]
};

createUserService = async (name, email) => {
    const result = await pool.query ("INSERT INTO blog_uesers (name, email) VALUES ($1, $2" [name, email])
};

updateUserService = async (name, email, userId) => {
    const result = await pool.query(
        "UPDATE blog_users SET name=$1, email=$2 WHERE id =$3 RETURNING *",
        [name, email, userId]
    )
    return result.rows[0];
};

deleteUserService = async (userId) => {
    const result = await pool.query(
        "DELETE FROM blog_users WHERE userId = $1 RETURNING *", [userId]
    )
    return result.rows[0];
};

module.exports = {getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService}