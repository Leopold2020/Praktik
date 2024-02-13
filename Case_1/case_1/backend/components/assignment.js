const pool = require("../database/db");

const addAssignment = async (match_id, account_id, account_role) => {
    try {
        return await pool.query(
            `INSERT INTO assignment (match_id, account_id, account_role) VALUES ('${match_id}', '${account_id}', '${account_role}')`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return {message: "Assignment added successfully"}
            } else {
                return {message: "Assingment not added"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
};

const removeAssignment = async (id) => {
    try {
        return await pool.query(
            `DELETE FROM assignment WHERE id = '${id}'`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return {message: "Assignment removed successfully"}
            } else {
                return {message: "Assignment not removed"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
};

const getAssignment = async (account_id) => {
    try {
        const referee = await pool.query(
            `SELECT * FROM assignment WHERE account_id = '${account_id}'`
        );
        return referee.rows;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    addAssignment,
    removeAssignment,
    getAssignment
}