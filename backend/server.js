require("dotenv").config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL = process.env.VERISOUL_API_URL;
const headers = {
    'Content-Type': 'application/json',
    'project_id': 1,
    'x-api-key': process.env.VERISOUL_API_KEY
}

app.get("/api/session", async (req, res) => {
    let sessionId = req.query.sessionId

    try {
        let response = await fetch(`${API_URL}/session/${sessionId}`, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
        if (!response.ok) {
            throw new Error(`failed to get Verisoul session: ${response.status}`);
        }

        let {isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts} = await response.json();

        // DECISIONING LOGIC SAMPLE, customize your own logic here
        if (numAccounts === 0) { // if user is unique, then enroll them
            let enroll = await fetch(`${API_URL}/session/${sessionId}/enroll`, {
                method: 'POST',
                headers,
                redirect: 'follow'
            });

            if (!enroll.ok) {
                throw new Error(`failed to enroll Verisoul session: ${enroll.status}`);
            }
        }

        res.status(200).send({isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts});
    } catch (err) {
        console.error(err);

        res.status(500).send({error: err.message});
    }
});

app.get("/api/create-session", async (req, res) => {
    try {
        let response = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                "externalId": req.query.externalId,
            })
        });

        if (!response.ok) {
            throw new Error(`failed to create Verisoul session: ${response.status}`);
        }

        let {sessionId} = await response.json();

        res.status(200).send({sessionId})
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

app.get("/api/wallet-list", async (req, res) => {
    ;
    try {
        let response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error(`failed to get wallet list: ${response.status}`);
        }

        let results = await response.json();

        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})


const PORT = process.env.SERVER_PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
