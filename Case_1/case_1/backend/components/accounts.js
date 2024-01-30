const pool = require("../database/db");

const login = async (email, password) => {
    try {
        const user = await pool.query(
        `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`,
        [email, password]
        );
        return user.rows[0];
    } catch (err) {
        console.error(err.message);
    }
    };

module.exports = {
    login
}