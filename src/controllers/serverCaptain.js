"use strict";
const express = require("express");
const serverCaptain = express();
const Instafeed = require("../models/Instafeed");

const port = process.env.PORT || 5000;

exports.onServerStart = async () => {
  console.log(`Server started on port ${port}`);
  const instafeedResults = Instafeed.instafeedCall();
  serverCaptain.set("instafeedResults", instafeedResults);
}
