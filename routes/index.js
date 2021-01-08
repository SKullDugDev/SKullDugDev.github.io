"use strict";
const express = require("express");
const router = express.Router();
const path = require("path");
const indexController = require("../src/controllers/indexController");

router.get("/", indexController.renderHomePage);

exports.router = router;
