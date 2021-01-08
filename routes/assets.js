"use strict";
const express = require("express");
const router = express.Router();

const assetsController = require('../src/controllers/assetsController')

router.get(`/images/igresults/:mediaId.jpg`, assetsController.mediaPath);

router.get(`/images/:imgId.:imgExt`, assetsController.imagePath);

router.get(`/images/favicons/:faviconId.:faviconExt`, assetsController.faviconPath);

exports.router = router;
