"use strict";

require("dotenv").config();
const axios = require("axios");

// Get token from token server

// fetchGramResults variables
let igMediaTypes = "media_url";
let igReturnLimit = 3;

function fetchGramResults() {
  // Init Environment Variable
  const INSTANT_TOKEN_USER_SECRET = process.env.INSTANT_TOKEN_USER_SECRET;
  console.log("Getting instant-token");
  // the promise chain starts with igDataPromise
  const igDataPromise = axios
    // GET request to instant-tokens site
    .get(
      `https://ig.instant-tokens.com/users/9c65c67c-26b6-4577-8cdf-ca00bb9e6fe8/instagram/17841401794723180/token?userSecret=${INSTANT_TOKEN_USER_SECRET}`
    )
    // then access the response form instant-tokens, log, and return it
    .then(function (instantTokenResponse) {
      console.log("Accessing Token");
      const instantToken = instantTokenResponse.data.Token;
      console.log(instantToken);
      return instantToken;
    })
    // then log that we have the token
    .then(function (instantToken) {
      console.log("Token Recieved. Beginning fetching.");
      // make another GET request, but this time to Instagram's Basic API and return it
      const igResponse = axios.get(
        `https://graph.instagram.com/me/media?fields=${igMediaTypes}&access_token=${instantToken}&limit=${igReturnLimit}`
      );
      return igResponse;
    })

    // then use instagram's response to create an array
    .then(function (igResponse) {
      console.log("Fetching from IG Basic API");
      let igData = igResponse.data.data;
      console.log("Fetching complete...");
      console.log(igData);
      return igData;
    })
    .catch(function (error) {
      console.log("Oh no, the API couldn't fetch your results");
      console.log(`userSecret:${INSTANT_TOKEN_USER_SECRET}`);
      console.log(error);
    });
  return igDataPromise;
}

exports.fetchGramResults = fetchGramResults;
