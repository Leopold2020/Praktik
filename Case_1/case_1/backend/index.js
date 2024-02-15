const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.REACT_APP_PORT || 5000;
let ElasticEmail = require('@elasticemail/elasticemail-client');

const accounts = require("./components/accounts/account");
const match = require("./components/match");
const referee = require("./components/accounts/referee");
const token = require("./components/token");
const assignment = require("./components/assignment");


let defaultClient = ElasticEmail.ApiClient.instance;

let apikey = defaultClient.authentications['apikey'];
apikey.apiKey = "8643020A0F6167897D6FBDD81B60D6F17E3E160275F9384218F3A47009D4AB140DA4C43B03578E99233474810BD9748A"

let api = new ElasticEmail.EmailsApi()
let email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [
      new ElasticEmail.EmailRecipient("victor.dekker@elev.ga.ntig.se")
    ],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: "My test email content ;)"
        })
      ],
      Subject: "JS EE lib test",
      From: "t42023@gmail.com"
    }
  });
  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully.');
    }
};
    
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        accounts.login(email, password).then((response)=> {
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
        const { username, password, email, phone } = req.body;
        if (!username || !password || !email || !phone) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await accounts.register(
                username, 
                password, 
                email, 
                phone
            ).then((response) => {
                console.log(response)
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
})

<<<<<<< HEAD
app.post("/referee/add", token.verifyToken, async (req, res) => {
    try {
        const { name, email, phone, bank_clering, bank_number} = req.body;
        if (!name || !email || !phone || !bank_clering || !bank_number) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await referee.addReferee(
                name, 
                email, 
                phone,
                bank_clering,
                bank_number
            ).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/referee/get/all", token.verifyToken, async (req, res) => {
=======
app.get("/account/referee/get/all", token.verifyToken, async (req, res) => {
>>>>>>> 2fc48cd367691fa3f4878f6e174ef0619d76efb7
    try {
        const refereeList = await referee.getAllReferees();
        res.json(refereeList);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/account/coach/get/all", token.verifyToken, async (req, res) => {
    try {
        const coachList = await coach.getAllCoaches();
        res.json(coachList);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/account/admin/get/all", token.verifyToken, async (req, res) => {
    try {
        const adminList = await admin.getAllAdmins();
        res.json(adminList);
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

app.post("/match/add", token.verifyToken, async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assignment/add", token.verifyToken, async (req, res) => {
    try {
        const { match_id, referee_id } = req.body;
        if (!match_id || !referee_id) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await assignment.addRefereeToAssignment(
                match_id, 
                referee_id
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
        const { match_id, referee_id } = req.body;
        if (!match_id || !referee_id) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await assignment.removeRefereeFromAssignment(
                match_id, 
                referee_id
            ).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/assignment/get", token.verifyToken, async (req, res) => {
    try {
        const { match_id } = req.body;
        if (!match_id) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        } else {
            await assignment.getRefereeFromAssignment(
                match_id
            ).then((response) => {
                res.json(response);
            })
        }
    } catch (err) {
        console.error(err.message);
    }
});



 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

