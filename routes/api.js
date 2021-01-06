"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const instafeed = require("../instafeed");

router.get("/", async function (req, res) {
  console.log("API beginning work");
  try {
    const gramResults = await instafeed.fetchGramResults();
    if (gramResults === undefined) {
      res.send("Sorry, but we couldn't find anything here");
      return;
    }
    console.log("Result payload being delivered");
    res.send(gramResults);
  } catch (error) {
    console.log("Oh no! The API failed in talking to instafeed");
    return;
  }
});

exports.router = router;
