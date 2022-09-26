require("dotenv").config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require("cors");

const app = express();
// let corsOptions = {
//   origin: process.env.CLIENT_ORIGIN || "https://api-dev.verisoul.xyz"
// };
let corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3003"
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

  const URL = `${API_URL}/session/${sessionId}`;
  let response = await fetch(URL, requestOptions);

  let {isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts} = await response.json();

  // DECISIONING LOGIC SAMPLE, create your own here
  if (numAccounts === 0) { // enroll user
    let requestOptions = {
      method: 'POST',
      headers,
      redirect: 'follow'
    };

    const URL = `${API_URL}/session/${sessionId}/enroll`;
    await fetch(URL, requestOptions);
  }

  res.status(200).send({isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts});
});

app.get("/api/create-session", async (req, res) => {
  let raw = JSON.stringify({
    "externalId": req.query.externalId,
    "project_id": 1
  });

  let requestOptions = {
    method: 'POST',
    headers,
    body: raw
  };

  try{
    let response = await fetch(`${API_URL}/session`, requestOptions)
    let {sessionId} = await response.json();

    res.status(200).send({sessionId})
  } catch (e) {
    res.status(500).send({error: e.message})
  }
});

app.get("/api/wallet-list", async (req, res) => {
  let requestOptions = {
    method: 'GET',
    headers
  };

  try{
    let response = await fetch(`${API_URL}/users`, requestOptions)
    let results = await response.json();

    res.status(200).send(results);
  } catch (e) {
    res.status(500).send({error: e.message})
  }
})


const PORT = process.env.SERVER_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
