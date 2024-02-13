const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.REACT_APP_PORT || 5000;

const account = require("./components/accounts/account");
const admin = require("./components/accounts/admin")
const coach = require("./components/accounts/coach")
const referee = require("./components/accounts/referee");
const assignment = require("./components/assignment");
const match = require("./components/match");
const token = require("./components/token");

app.post("/account/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        account.login(email, password).then((response)=> {
            if (response === 401) {
                res.sendStatus(401)
            } else {
                token.getToken(response).then((token)=>{
                    res.status(200).json({
                        name: response.username,
                        accessToken: token,
                        status: 200
                    })
                })
            }
        })
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/account/refresh", async (req, res) => {
    try {
        const { accessToken } = req.body;
        await token.refreshToken(accessToken).then((response) => {
            if (response === 403) {
                res.sendStatus(403)
            } else {
                res.json(response)
            }
        })
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/account/register", token.verifyToken ,async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const { username, password, email, phone, role } = req.body;
            if (!username || !password || !email || !phone || !role) {
                return res.status(422).json({ msg: "Not all fields have been entered." });
            } else {
                await account.register(
                    username, 
                    password, 
                    email, 
                    phone,
                    role
                ).then((response) => {
                    if (response.message === "User added successfully") {
                        res.status(200).json(response)
                    } else {
                        res.status(400).json("User not added")
                    }
                })
            }
        } else {
            res.status(403)
        }
    } catch (err) {
        console.error(err.message);
    }
})

// app.post("/referee/add", token.verifyToken, async (req, res) => {
//     try {
//         if (req.user.role = "admin") {
//             const { name, email, phone, bank_clering, bank_number} = req.body;
//             if (!name || !email || !phone || !bank_clering || !bank_number) {
//                 return res.status(400).json({ msg: "Not all fields have been entered." });
//             } else {
//                 await referee.addReferee(
//                     name, 
//                     email, 
//                     phone,
//                     bank_clering,
//                     bank_number
//                 ).then((response) => {
//                     res.json(response);
//                 })
//             }
//         } else {
//             res.status(403)
//         }
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.get("/account/referee/get/all", token.verifyToken, async (req, res) => {
    try {
        const refereeList = await referee.getAllReferee();
        res.json(refereeList);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/get/all", token.verifyToken, async (req, res) => {
    try {
        const matchList = await match.getAllMatch();
        res.json(matchList);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/get/single/:id", token.verifyToken, async (req, res) => {
    try {
        const matchList = await match.getSingleMatch(req.params.id);
        res.json(matchList);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/match/filter", token.verifyToken, async (req, res) => {
    try {
        const { date, location, field, team_1, team_2 } = req.body;
        // if (!date || !location || !field || !team_1 || !team_2) {
        //     return res.status(400).json({ msg: "Not all fields have been entered." });
        // } else {
            await match.filterMatch(
                date, 
                location, 
                field, 
                team_1, 
                team_2
            ).then((response) => {
                res.json(response);
            })
        // }
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/match/add", token.verifyToken, async (req, res) => {
    try {
        if (req.user.role = "admin") {
            const { date, location, field, team_1, team_2 } = req.body;
            if (!date || !location || !field || !team_1 || !team_2) {
                return res.status(400).json({ msg: "Not all fields have been entered." });
            } else {
                await match.addMatch(
                    date, 
                    location, 
                    field, 
                    team_1, 
                    team_2
                ).then((response) => {
                    res.json(response);
                })
            }
        } else {
            res.status(403)
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/match/update", token.verifyToken, async (req, res) => {
    try {
        const { date, location, field, team_1, team_2 } = req.body;
        if (!date || !location || !field || !team_1 || !team_2) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await match.updatematch(
                date, 
                location, 
                field, 
                team_1, 
                team_2
            ).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assignment/add", token.verifyToken, async (req, res) => {
    try {
        const { match_id, account_id, role } = req.body;
        if (!match_id || !account_id || !role ) {
            return res.status(422).json({ msg: "Not all fields have been entered." });
        } else {
            await assignment.addAssignment(
                match_id, 
                account_id,
                role
            ).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assignment/remove", token.verifyToken, async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await assignment.removeAssignment(id).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assignment/get", token.verifyToken, async (req, res) => {
    try {
        const { id } = req.body;
        if (id === req.user.id || req.user.role === "admin") {
            if (!id) {
                return res.status(400).json({ msg: "Not all fields have been entered." });
            } else {
                await assignment.getAssignment(
                    id
                ).then((response) => {
                    res.json(response);
                })
            }
        } else {
            res.status(403)
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });