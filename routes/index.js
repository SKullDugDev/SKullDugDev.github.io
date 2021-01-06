"use strict";
const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");


router.get("/", async (req, res) => {
  const apiResponse = await axios.get("http://localhost:5000/api");
  // retu
  const linkInfo = await Promise.all(
    Object.entries(apiResponse.data).map(async ([key, apiResponse]) => {
      const mediaUrl = await axios({
        method: "get",
        url: apiResponse.media_url,
        responseType: "stream",
      });

      const newImagePath = `/public/assets/images/igresults/${apiResponse.id}.jpg`;

      const permalink = apiResponse.permalink;
      const caption = apiResponse.caption;
      const imageStream = fs.createWriteStream(newImagePath);

      mediaUrl.data.pipe(imageStream);
      console.log("breakpoint");

      return `<a href="${permalink}"><img title="${caption}" alt="${caption}" src="${newImagePath}" /></a>`;
    })
  );
  const linkString = linkInfo.join("\n");
  res.render("index.html", { message: linkString });
  console.log(linkString);
  console.log(linkInfo);
});

exports.router = router;
