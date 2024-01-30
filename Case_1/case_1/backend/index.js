const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.REACT_APP_PORT || 5000;

const accounts = require("./components/accounts");
// const match = require("./components/match");
// const token = require("./components/token");

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await accounts.login(email, password);
        res.json(user);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });