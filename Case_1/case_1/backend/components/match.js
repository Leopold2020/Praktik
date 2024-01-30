const pool = require("../database/db");

const getAllMatch = async () => {
    try {
        const match = await pool.query(
            `SELECT * FROM match`
        );
        return match.rows;
    } catch (err) {
        console.error(err.message);
    }
};

const addMatch = async (date, location, field, team_1, team_2) => {
    try {
        return await pool.query(
            `INSERT INTO match (date, location, field, TEAM_1, TEAM_2) VALUES ('${date}', '${location}', '${field}', '${team_1}', '${team_2}')`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return {message: "Match added successfully"}
            } else {
                return {message: "Match not added"}
            }
        })
    } catch (err) {
        console.error(err.message);
    }
}


module.exports = {
    getAllMatch,
    addMatch
}