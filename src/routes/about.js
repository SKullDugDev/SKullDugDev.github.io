"use strict";

const express = require("express");
const router = express.Router();

const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.renderAboutPage);

exports.router = router;
