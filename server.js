"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
/* const https = require("https") */
const axios = require("axios");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api.js");

// Init express and create server instance
const server = express();

// Set port
const port = process.env.PORT || 5000;

// Get token from token server

// To parse URL encoded data
server.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
server.use(bodyParser.json());

// API
server.use("/api", apiRoutes.router);

// Set static folder
server.use(express.static(path.join(__dirname, "public")));

// Server is listening on port
server.listen(port, () => console.log(`Server started on port ${port}`));
