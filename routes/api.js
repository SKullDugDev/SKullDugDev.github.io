"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const instafeed = require("../instafeed");

router.get("/", function (req, res) {
  console.log("Hello API");
  instafeed
    .fetchGramResults()
    .then(function (gramResults) {
      if (gramResults === undefined) {
          res.send("Sorry, but we couldn't find anything here")
        return Promise.reject(new Error("igData Promise undefined"));
      }
      console.log("Result payload being delivered");
      console.log(gramResults);
      res.send(gramResults);
    })
    .catch(function (error) {
      console.log("API did not recieve payload to share");
      console.log(error)
    });
});

exports.router = router;
