"use strict";
const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { Console } = require("console");

router.get("/", async (req, res) => {
  // Make the API Call
  const apiResponse = await axios.get("http://localhost:5000/api");
  // return the info for the images
  const imageInfo = await Promise.all(
    Object.entries(apiResponse.data).map(async ([key, apiResponseData]) => {
      const mediaUrl = await axios({
        method: "get",
        url: apiResponseData.media_url,
        responseType: "stream",
      });

      const newImagePath = `/public/assets/images/igresults/${apiResponseData.id}.jpg`;

      const permalink = apiResponseData.permalink;
      const caption = apiResponseData.caption;
      const id = apiResponseData.id;
      const imageStream = fs.createWriteStream(newImagePath);

      mediaUrl.data.pipe(imageStream);

      return [permalink, caption, newImagePath, id];
    })
  );

  const newImageInfo = await Promise.all(
    imageInfo.map(function (infoSet) {
      const permalink = infoSet[0];
      const caption = infoSet[1];
      const newImagePath = infoSet[2];
      const id = infoSet[3];
      const imageInfoPacket = {
        permalink: permalink,
        newImagePath: newImagePath,
        caption: caption,
        id: id,
      };
      return imageInfoPacket;
    })
  );

  /* 



  let i = 0
  linkInfo.forEach(function(infoSet){
    const arrayKey = i++
    const permalinkArray =[]
    const newImagePathArray = []
    const captionArray
    const idArray = []
    permalinkArray[arrayKey] = infoSet[0]
    newImagePathArray[arrayKey] = infoSet[1]
    captionArray[arrayKey] = infoSet[2]
    idArray[arrayKey] = infoSet[3]
  }) */

  console.log(newImageInfo);
  const linkString = imageInfo.join("\n");
  // res.send("Hello");
  res.render("index.html", { data: newImageInfo });
});

exports.router = router;
