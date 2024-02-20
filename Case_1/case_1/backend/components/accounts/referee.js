const pool = require("../../database/db");

const getAllReferees = async () => {
    try {
        return await pool.query(
            `SELECT id, username, email, phone, bank_clering, bank_number FROM account WHERE assigned_role = 'referee'`
        ).then((response) => {
            if (!response.rowCount == 0) {
                return response.rows
            } else {
                return null
            }
        });
        // return referee.rows;
    } catch (err) {
        console.error(err.message);
    }
};

const getRefereeById = async (id) => {
    try {
        const referee = await pool.query(
            `SELECT * FROM account WHERE id = '${id}'`
        );
        return referee.rows[0];
    } catch (err) {
        console.error(err.message);
    }
};


module.exports = {
  getAllReferees,
    getRefereeById
}