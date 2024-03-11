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

const getMatchAssignment = async (match_id) => {
    try {
        return pool.query(
            `SELECT account.id, account.firstname, account.lastname, account.email, account.phone, account.assigned_role
            FROM (assignment
            INNER JOIN account ON assignment.account_id = account.id)
            WHERE assignment.match_id = ${match_id} AND account.assigned_role = 'referee';`
        ).then( async (refereeList) => {
            return pool.query(
                `SELECT account.id, account.firstname, account.lastname, account.email, account.phone, account.assigned_role
                FROM (assignment
                INNER JOIN account ON assignment.account_id = account.id)
                WHERE assignment.match_id = ${match_id} AND account.assigned_role = 'coach';`
            ).then((coachList) => {
                return {refereeList: refereeList.rows, coachList: coachList.rows}
            })
        })
    } catch (err) {
        console.error(err.message);
    }
};

const getAllAccountsAssignment = async (account_id) => {
    try {
        return await pool.query(
            `SELECT assignment.id, assignment.match_id, match.date, match.location, match.field, account.assigned_role, match.TEAM_1, match.TEAM_2
            FROM (assignment
                INNER JOIN account ON assignment.account_id = account.id
                INNER JOIN match ON assignment.match_id = match.id)
                WHERE assignment.account_id = '${account_id}' ORDER BY match.date DESC`
        ).then((response) => {
            if (!response.rowCount == 0) {
                const tzoffset = new Date().getTimezoneOffset() * 60000;
                for (let i = 0; i < response.rows.length; i++) {
                    response.rows[i].date = new Date(
                        response.rows[i].date - tzoffset
                    ).toISOString().slice(0, -1)
                    var fullDate = response.rows[i].date.split("T");
                    response.rows[i].date = fullDate[0]
                    response.rows[i].time = fullDate[1].slice(0, 5)
                }
                return response.rows
            } else {
                return null
            }
        });
    } catch (err) {
        console.error(err.message);
    }
};

const getComingAccountsAssignment = async (account_id) => {
    try {
        return await pool.query(
            `SELECT assignment.id, assignment.match_id, match.date, match.location, match.field, account.assigned_role, match.TEAM_1, match.TEAM_2
            FROM (assignment
                INNER JOIN account ON assignment.account_id = account.id
                INNER JOIN match ON assignment.match_id = match.id)
                WHERE assignment.account_id = '${account_id}' AND match.date >= CURRENT_DATE ORDER BY match.date DESC`
        ).then((response) => {
            if (!response.rowCount == 0) {
                const tzoffset = new Date().getTimezoneOffset() * 60000;
                for (let i = 0; i < response.rows.length; i++) {
                    response.rows[i].date = new Date(
                        response.rows[i].date - tzoffset
                    ).toISOString().slice(0, -1)
                    var fullDate = response.rows[i].date.split("T");
                    response.rows[i].date = fullDate[0]
                    response.rows[i].time = fullDate[1].slice(0, 5)
                }
                return response.rows
            } else {
                return null
            }
        });
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    addAssignment,
    removeAssignment,
    getAssignment,
    getMatchAssignment,
    getAllAccountsAssignment,
    getComingAccountsAssignment
}