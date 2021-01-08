const CronJob = require("cron").CronJob;
const Instafeed = require("../models/Instafeed");

// Run at midnight every night
const cronExpression = "00 00 * * *";

const cronJob = new CronJob(cronExpression, cronFunction, null, true);

async function cronFunction() {
  console.log("Cron: This is a midnight update");
  try {
    const gramResults = await instafeed.fetchGramResults();
    if (gramResults === undefined) {
      console.log("gramResults is undefined");
      res.send("Sorry, but we couldn't find anything here");
      return;
    }
    console.log("Result payload being delivered");
    res.send(gramResults);
  } catch (error) {
    console.log("Oh no! The API failed in talking to instafeed");
    return;
  }
}
