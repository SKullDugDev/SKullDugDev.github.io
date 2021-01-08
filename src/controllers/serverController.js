"use strict";

const express = require("express");
const instafeed = require("../models/Instafeed");
const app = express();

const port = process.env.PORT || 5000;

exports.onServerStart = () => {
  app.get("/instafeedResults", instafeed);
  if (require.main === module) {
    (async () => {
      console.log(`Server started on port ${port}`);
      const instafeedResults = await instafeed.instafeedCall();
      app.set("instafeedResults", instafeedResults);
      app.listen(port);
    })();
  }
};
