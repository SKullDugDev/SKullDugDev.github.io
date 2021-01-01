"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
/* const https = require("https") */
const axios = require("axios");

// Init INSTANT_TOKEN_USER_SECRET
const INSTANT_TOKEN_USER_SECRET = process.env.INSTANT_TOKEN_USER_SECRET

// Init express and create server instance
const server = express();

// Set port
const port = process.env.PORT || 5000;

// Get token from token server

axios
  .get(
    `https://ig.instant-tokens.com/users/9c65c67c-26b6-4577-8cdf-ca00bb9e6fe8/instagram/17841401794723180/token?userSecret=${INSTANT_TOKEN_USER_SECRET}`
  )
  .then((response) => {
    console.dir(response.data);
  })
  .catch((error) => {
    console.log("There has been an error");
    console.log(error);
  });

function tokenConfirmation(read_token_file) {
  // Try to parse JSON, catch error if can't
  try {
    // Parse the JSON object into a js object
    let token_file_content = JSON.parse(read_token_file);
    console.dir(token_file_content);
    console.log(token_file_content.ig_token.token);

    // If the token is null, replace it
    if (token_file_content.ig_token.token === null) {
      console.log("Your token is empty");
      const replacement_token = "1532153156";
      token_file_content.ig_token.token = replacement_token;
      console.dir(token_file_content);
      const changed_content = JSON.stringify(token_file_content);
      fs.writeFileSync(path.join(__dirname, "tokens.json"), changed_content);
    }
  } catch (err) {
    console.log("There has been an error parsing your JSON.");
    console.log(err);
  }
}

/* tokenConfirmation(read_token_file); */

// Create your endpoints/route handlers

// Set static folder
server.use(express.static(path.join(__dirname, "public")));

// Server is listening on port
server.listen(port, () => console.log(`Server started on port ${port}`));
