"use strict";

require("dotenv").config();
const axios = require("axios");

// Get token from token server

// fetchGramResults variables
let igMediaTypes = "media_url, permalink, id, caption";
let igReturnLimit = 3;

async function fetchGramResults() {
  // Init Environment Variable
  const INSTANT_TOKEN_USER_SECRET = process.env.INSTANT_TOKEN_USER_SECRET;
  // Initial log
  console.log("Getting instant-token");
  // try
  try {
    // to get instant token reponse with an await and store it
    const instantTokenResponse = await axios.get(
      `https://ig.instant-tokens.com/users/9c65c67c-26b6-4577-8cdf-ca00bb9e6fe8/instagram/17841401794723180/token?userSecret=${INSTANT_TOKEN_USER_SECRET}`
    );
    console.log("Accessing Token");
    // save the token from the response
    const instantToken = instantTokenResponse.data.Token;
    console.log(instantToken);
    console.log("Token Recieved. Fetching from Instagram Basic API...");
    try {
      const instagramResponse = await axios.get(
        `https://graph.instagram.com/me/media?fields=${igMediaTypes}&access_token=${instantToken}&limit=${igReturnLimit}`
      );
      console.log("Response recieved...continuing...saving data...");
      const instagramData = instagramResponse.data.data;
      console.log(instagramData);
      return instagramData;
    } catch (error) {
      console.log("Oops, looks like instagram said nah, bruh");
      return;
    }
  } catch (error) {
    console.log("Oh no, looks like you didn't get your token");
    emptyTokenObject = [];
    return;
  }
}

exports.fetchGramResults = fetchGramResults;
