"use strict";
const indexModel = require("../models/IndexModel");

exports.renderHomePage = async (req, res) => {
  const instafeedResults = await req.app.get("instafeedResults");
  if (instafeedResults === []) {
    res.render("index_bare.html");
  }
  const infoPacket = await indexModel.populateInstaDiv(
    req,
    res,
    instafeedResults
  );
  res.render("index.html", { data: infoPacket });
};
