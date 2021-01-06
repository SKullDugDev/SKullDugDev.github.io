"use strict";
const express = require("express");
const router = express.Router();
const path = require("path");

router.get(`/images/igresults/:mediaId.jpg`, function (req, res) {
  console.log("Getting instagram mediaId from url");
  const mediaId = req.params.mediaId;
  console.log("Resolving file path");
  const mediaPath = path.resolve(
    `./public/assets/images/igresults/${mediaId}.jpg`
  );
  console.log(`File path: ${mediaPath} resolved`);
  res.sendFile(mediaPath);
});

router.get(`/images/:imgId.:imgExt`, function (req, res) {
  console.log("Getting imageId from url");
  const imgId = req.params.imgId;
  const imgExt = req.params.imgExt;
  console.log("Resolving file path");
  const imagePath = path.resolve(`./public/assets/images/${imgId}.${imgExt}`);
  console.log(`File path: ${imagePath} resolved`);
  res.sendFile(imagePath);
});

router.get(`/images/favicons/:faviconId.:faviconExt`, function (req, res) {
  console.log("Getting faviconId from url");
  const imgId = req.params.faviconId;
  const imgExt = req.params.faviconExt;
  console.log("Resolving file path");
  const faviconPath = path.resolve(`./public/assets/images/favicons/${imgId}.${imgExt}`);
  console.log(`File path: ${faviconPath} resolved`);
  res.sendFile(faviconPath);
});

exports.router = router;
