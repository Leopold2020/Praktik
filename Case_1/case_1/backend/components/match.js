const pool = require("../database/db");

const getAllMatch = async () => {
    try {
        const match = await pool.query(
            `SELECT * FROM match`
        );
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        for (let i = 0; i < match.rows.length; i++) {
            match.rows[i].date = new Date(
            match.rows[i].date - tzoffset
        ).toISOString().slice(0, -1)}
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

const getSingleMatch = async (id) => {
    try {
        const match = await pool.query(
            `SELECT * FROM match WHERE id = '${id}'`
        );
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        match.rows[0].date = new Date(
            match.rows[0].date - tzoffset
        ).toISOString().slice(0, -1)
        return match.rows;
    } catch (err) {
        console.error(err.message);
    }
};

const addRefereeToMatch = async (match_id, referee_id) => {
    try {
        return await pool.query(
            `INSERT INTO referee_match (match_id, account_id) VALUES ('${match_id}', '${referee_id}')`
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


module.exports = {
    getAllMatch,
    addMatch,
    getSingleMatch,
    addRefereeToMatch
}