require("dotenv").config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL = process.env.VERISOUL_API_URL;
const headers = {
    'project_id': 1,
    'x-api-key': process.env.VERISOUL_API_KEY
};

app.get("/api/session", async (req, res) => {
    try {
        // For more information on creating a session token
        // See https://docs.verisoul.xyz/reference/api-reference/session-token
        let response = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers
        });

        if (!response.ok) {
            throw new Error(`failed to create Verisoul session: ${response.status}`);
        }

        let {sessionToken} = await response.json();

        res.status(200).send({sessionToken})
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

app.get("/api/account/:accountId", async (req, res) => {
    try {
        let accountId = req.params?.accountId;
        let response = await fetch(`${API_URL}/account/${accountId}`, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
        if (!response.ok) {
            throw new Error(`failed to get Verisoul account: ${response.status}`);
        }

        // See https://docs.verisoul.xyz/reference/api-reference/accounts
        // for other fields in the response like isBlocked, hasBlockedAccounts, etc.
        let {attributes, numAccounts} = await response.json();

        // DECISIONING LOGIC SAMPLE
        // customize your own logic here
        console.log(`Enroll logic is: `);
        console.log(`numAccounts: ${numAccounts}`);
        if (numAccounts === 0) { // if user is unique (has no other accounts in the project), then enroll
            let enroll = await fetch(`${API_URL}/account/${accountId}/enroll`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    "externalId": req.query.externalId,
                }),
                redirect: 'follow'
            });

            if (!enroll.ok) {
                throw new Error(`failed to enroll Verisoul session: ${enroll.status}`);
            }
        }

        res.status(200).send(attributes);
    } catch (err) {
        console.error(err);

        res.status(500).send({error: err.message});
    }
});

app.get("/api/wallet-list", async (req, res) => {
    try {
        let response = await fetch(`${API_URL}/accounts`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error(`failed to get wallet list: ${response.status}`);
        }

        let results = await response.json();

        // filter out accounts that are not enrolled
        results = results.filter(account => account?.isEnrolled);

        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

app.get("/api/account/:accountId/toggle", async (req, res) => {
    try {
        let accountId = req.params?.accountId;
        let response = await fetch(`${API_URL}/account/${accountId}`, {
            method: 'GET',
            headers,
            redirect: 'follow'
        });
        if (!response.ok) {
            throw new Error(`failed to get Verisoul account: ${response.status}`);
        }

        let {isBlocked} = await response.json();
        let action = 'block';
        if (isBlocked) action = 'unblock';

        // For more information on block/unblocking accounts
        // see https://docs.verisoul.xyz/reference/api-reference/blocklist
        let toggle = await fetch(`${API_URL}/${action}/${accountId}`, {
            method: 'POST',
            headers,
            redirect: 'follow'
        });

        if (!toggle.ok) {
            throw new Error(`failed to toggle Verisoul account: ${toggle.status}`);
        }

        let results = await toggle.json();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

const PORT = process.env.SERVER_PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
