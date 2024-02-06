const pool = require("../database/db");

const addRefereeToAssignment = async (match_id, referee_id) => {
    try {
        return await pool.query(
            `INSERT INTO assignment (match_id, account_id) VALUES ('${match_id}', '${referee_id}')`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return {message: "Referee added successfully"}
            } else {
                return {message: "Referee not added"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
};

const removeRefereeFromAssignment = async (match_id, referee_id) => {
    try {
        return await pool.query(
            `DELETE FROM assignment WHERE match_id = '${match_id}' AND account_id = '${referee_id}'`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return {message: "Referee removed successfully"}
            } else {
                return {message: "Referee not removed"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
};

const getRefereeFromAssignment = async (match_id) => {
    try {
        const referee = await pool.query(
            `SELECT * FROM assignment WHERE match_id = '${match_id}'`
        );
        return referee.rows;
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    addRefereeToAssignment,
    removeRefereeFromAssignment,
    getRefereeFromAssignment
}