"use strict";

//Modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Initialize Routers
const indexRoutes = require("../routes/index");
const assetRoutes = require("../routes/assets");
const serverController = require("./controllers/serverController");

// Initialize Server and export instance
const server = express();
exports.server = server;

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

// Routes

// Index
server.use("/", indexRoutes.router);

// Assets
server.use("/public/assets", assetRoutes.router);

// Server is listening on port
server.listen(port, serverController.onServerStart(server, port));
