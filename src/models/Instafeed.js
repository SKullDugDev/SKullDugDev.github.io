"use strict";

require("dotenv").config({ path: "../.env" });
const axios = require("axios");

// Get token from token server

// fetchGramResults variables
const igMediaTypes = "media_url, permalink, id, caption";
const igReturnLimit = 3;

exports.instafeedCall = async function (req, res) {
  console.log("Instafeed: Trying Call to Action");
  try {
    console.log("Instafeed: Fetching Instagram Results");
    const gramResults = await fetchGramResults();
    if (gramResults === undefined) {
      console.log("gramResults is undefined");
      res.send("Sorry, but we couldn't find anything here");
      gramResults = [];
      return gramResults;
    }
    console.log("Result payload being delivered");
    return gramResults;
  } catch (error) {
    console.log("Instafeed: The API failed in fetching gram results");
    console.log(error);
    const gramResults = [];
    return gramResults;
  }
};

async function fetchGramResults() {
  // Init Environment Variable
  const INSTANT_TOKEN_USER_SECRET = process.env.INSTANT_TOKEN_USER_SECRET;
  console.log("Instafeed: User Secret Stored...");
  try {
    console.log(INSTANT_TOKEN_USER_SECRET);
    console.log("Instafeed: Contacting Instant-Token...");
    // to get instant token reponse with an await and store it
    const instantTokenResponse = await axios.get(
      `https://ig.instant-tokens.com/users/9c65c67c-26b6-4577-8cdf-ca00bb9e6fe8/instagram/17841401794723180/token?userSecret=${INSTANT_TOKEN_USER_SECRET}`
    );
    console.log("Instafeed: Token retrieved...");
    // save the token from the response
    const instantToken = instantTokenResponse.data.Token;
    console.log(instantToken);
    console.log("Instafeed: Fetching from Instagram Basic API...");
    try {
      const instagramResponse = await axios.get(
        `https://graph.instagram.com/me/media?fields=${igMediaTypes}&access_token=${instantToken}&limit=${igReturnLimit}`
      );
      console.log("Instafeed: Response recieved...continuing...saving data...");
      const instagramData = instagramResponse.data.data;
      console.log(instagramData);
      console.log("Returning data...");
      return instagramData;
    } catch (error) {
      console.log("Instafeed: We failed in talking to Instagram");
      console.log(error);
      instagramData = [];
      return instagramData;
    }
  } catch (error) {
    console.log("Instafeed: We failed in fetching the Token ");
    console.log(error);
    instagramData = [];
    return instagramData;
  }
}
