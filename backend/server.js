require("dotenv").config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");

const app = express();
let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3003 "
};

app.use(cors(corsOptions));
app.use(express.json());

const API_URL = "http://localhost:3003/local"
const headers = {
  'Content-Type': 'application/json',
  'project_id': 1,
  'x-api-key': process.env.VERISOUL_API_KEY
}

app.get("/api/session", async (req, res) => {
  let sessionId = req.query.sessionId

  let requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const params = new URLSearchParams({sessionId});
  const URL = `${API_URL}/session?${params.toString()}`;
  let response = await fetch(URL, requestOptions);

  let {isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts} = await response.json();

  // Decision what to do with user session

  res.status(200).send({isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts});
});

app.post("/api/session", async (req, res) => {
  let raw = JSON.stringify({
    "externalId": req.query.externalId
  });

  let requestOptions = {
    method: 'POST',
    headers,
    body: raw
  };

  let response = await fetch(`${API_URL}/session`, requestOptions)
  let {sessionId} = await response.json();

  res.status(200).send({sessionId})
});


const PORT = process.env.SERVER_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
