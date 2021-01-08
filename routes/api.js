"use strict";

const express = require("express");
const router = express.Router();
const apiController = require("../src/controllers/apiController");

router.get("/", apiController.instagramCommunication);

exports.router = router;
