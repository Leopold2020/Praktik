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

const register = async (username, password, email, phone, role, bank_number, bank_clering) => {
    try {
        return await pool.query(
            `INSERT INTO account (username, password, email, phone, assigned_role, bank_number, bank_clering) VALUES ('${username}', '${password}', '${email}', '${phone}', '${role}', '${bank_number}', '${bank_clering}')`
        ).then((response) => {
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
const confirmAccount = async (token) => {
    try {
        const result = await pool.query(`UPDATE account SET confirmed = true WHERE token = '${token}'`);
        if (result.rowCount > 0) {
            return { message: "Account confirmed successfully" };
        } else {
            return { message: "Invalid token or account not found" };
        }
    } catch (err) {
        console.error(err.message);
        return { message: "Error confirming account" };
    }
};




module.exports = {
    login,
    register,
    confirmAccount
}