"use strict";
const Instafeed = require("../models/Instafeed");
const Cron = require("../Cron");

// Run this function when the server starts

exports.onServerStart = async (server, port) => {
  console.log(`Server started on port ${port}`);
  const instafeedResults = Instafeed.instafeedCall();
  server.set("instafeedResults", instafeedResults);
  Cron.midnightGram.start();
};
