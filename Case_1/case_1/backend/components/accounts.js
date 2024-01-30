const pool = require("../database/db");

const login = async (email, password) => {
    try {
        const user = await pool.query(
        `SELECT * FROM admin WHERE email = '${email}' AND password = '${password}'`);
        if (user.rows.length === 0) {
            return 401
        } else {
            return user.rows[0];
        }
    } catch (err) {
        console.error(err.message);
    }
};

const register = async (username, password, email, phone) => {
    try {
        return await pool.query(
            `INSERT INTO admin (username, password, email, phone) VALUES ('${username}', '${password}', '${email}', '${phone}')`
        ).then((response) => {
            console.log(response)
            if (!response.rowCount == 0) {
                return {message: "User added successfully"}
            } else {
                return {message: "User not added"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    login,
    register
}