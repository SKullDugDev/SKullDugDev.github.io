"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const bodyParser = require("body-parser");
const apiRoutes = require("../routes/api.js");
const indexRoutes = require("../routes/index");
const assetRoutes = require("../routes/assets");
const serverController = require("./controllers/serverController");

// Init express and create server instance
const server = express();

// Set port
const port = process.env.PORT || 5000;

// To parse json data
server.use(bodyParser.json());

// To parse URL encoded data
server.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
server.use(express.static(path.join(__dirname, "../public")));

// View Engine Setup
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "ejs");
// render HTML files
server.engine("html", require("ejs").renderFile);

// Routes to use

// Index
server.use("/", indexRoutes.router);

// API
server.use("/api", apiRoutes.router);

// Assets
server.use("/public/assets", assetRoutes.router);

// Server is listening on port
server.listen(port, serverController.onServerStart);
