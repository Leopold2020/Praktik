const pool = require("../../database/db");

const getAllReferee = async () => {
    try {
        const referee = await pool.query(
            `SELECT * FROM account WHERE role = 'referee'`
        );
        return referee.rows;
    } catch (err) {
        console.error(err.message);
    }
};

// const addReferee = async (name, email, phone, bank_clering, bank_number) => {
//     try {
//         return await pool.query(
//             `INSERT INTO referee (username, email, phone, bank_clering, bank_number) VALUES ('${name}', '${email}', '${phone}', '${bank_clering}', '${bank_number}')`
//         ).then((response) => {
//             if (!response.rowCount == 0) {
//                 return {message: "Referee added successfully"}
//             } else {
//                 return {message: "Referee not added"}
//             }
//         })
//     } catch (err) {
//         console.error(err.message);
//     }
// };

module.exports = {
  getAllReferee,
//   addReferee
}