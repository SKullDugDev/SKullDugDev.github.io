const CronJob = require("cron").CronJob;
const midnightExpression = "00 00 * * *";

// Modules
const server = require('./server')
const Instafeed = require("./models/Instafeed");

// Fetch Instafeed images from Instagram nightly at midnight
const nightlyInstaFetch = () => {
  console.log("Fetching instagram results at midnight");
  const instafeedResults = Instafeed.instafeedCall();
  server.server.set("instafeedResults", instafeedResults);
};
exports.midnightGram = new CronJob(
  midnightExpression,
  nightlyInstaFetch,
  null,
  true
);
