const pool = require("../../database/db");

const login = async (email, password) => {
    try {
        const user = await pool.query(
        // `SELECT * FROM account WHERE email = '${email}' AND password = '${password}'`
        `SELECT * FROM login('${email}', '${password}')`
        );
        if (user.rows.length === 0) {
            return 401
        } else {
            return user.rows[0];
        }
    } catch (err) {
        console.error(err.message);
    }
};

const register = async (firstname, lastname, password, email, phone, role) => {
    try {
        return await pool.query(
            `SELECT * FROM register(
                '${firstname}', 
                '${lastname}', 
                '${password}', 
                '${email}', 
                '${phone}', 
                '${role}'
            )`
            // `INSERT INTO account 
            //     (firstname, lastname, password, email, phone, assigned_role) 
            //     VALUES ('${firstname}', '${lastname}', '${password}', '${email}', '${phone}', '${role}')`
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




module.exports = {
    login,
    register
}