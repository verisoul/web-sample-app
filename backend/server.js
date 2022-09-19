const express = require('express');
const fetch = require('node-fetch');
const app = express();

// TODO: possibly delete these
// const path = require("path");
// const DIST_DIR = path.join(__dirname, "build/static");
// const HTML_FILE = path.join(DIST_DIR, "index.html");
// app.use(express.static(DIST_DIR));

const VERISOUL_PROJECT_STR = 'Demo';

// TODO: change this to a cname URL
const API_URL = "https://i5yha6z92c.execute-api.us-east-1.amazonaws.com/test/session"

// reach out to Verisoul to set up an API key and sandbox environment
const headers = {
  'Content-Type': 'application/json',
  'x-api-key': 'lRROqFxjdI6GQxXHYcA3ncvNYLZXe9la1QiGRLId'
}

app.get("/session", async (req, res) => {
  let sessionId = req.query.sessionId

  let requestOptions = {
    method: 'GET',
    headers,
    redirect: 'follow'
  };

  const params = new URLSearchParams({VERISOUL_PROJECT_STR, sessionId});
  const URL = API_URL + "?" + params.toString();
  let response = await fetch(URL, requestOptions);

  let {isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts} = await response.json();

  // Decision what to do with user session

  res.status(200).send({isSessionComplete, externalId, isBlocked, hasBlockedAccounts, numAccounts});
});

app.post("/session", async (req, res) => {
  let raw = JSON.stringify({
    "project": VERISOUL_PROJECT_STR,
    "externalId": req.query.externalId
  });

  let requestOptions = {
    method: 'POST',
    headers,
    body: raw
  };

  let response = await fetch(API_URL, requestOptions)
  let {sessionId} = await response.json();

  res.status(200).send({sessionId})
});

app.listen(5001);
