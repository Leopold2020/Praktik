const pool = require("../../database/db");

const login = async (email, password) => {
    try {
        const user = await pool.query(
        `SELECT * FROM account WHERE email = '${email}' AND password = '${password}'`);
        if (user.rows.length === 0) {
            return 401
        } else {
            return user.rows[0];
        }
    } catch (err) {
        console.error(err.message);
    }
};

const register = async (username, password, email, phone, role) => {
    try {
        return await pool.query(
            `INSERT INTO account (username, password, email, phone, assigned_role) VALUES ('${username}', '${password}', '${email}', '${phone}', '${role}')`
        ).then((response) => {
            
            console.log(response.message)

            if (!response.rowCount == 0) {
                return {message: "User added successfully"}
            } else {
                return {message: "User not added"}
            }
        })
    } catch (err) {
        console.log(err)
        return {message: "User not added"}
    }
}




module.exports = {
    login,
    register
}