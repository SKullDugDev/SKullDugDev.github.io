"use strict";
const indexModel = require("../models/IndexModel");

exports.renderHomePage = async (req, res) => {
  const instafeedResults = await req.app.get("instafeedResults");
  const newImageInfo = await indexModel.populateInstaDiv(
    req,
    res,
    instafeedResults
  );
  res.render("index.html", { data: newImageInfo });
};
