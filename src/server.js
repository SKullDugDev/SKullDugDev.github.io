"use strict";

//Modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Initialize Routers
const indexRoutes = require("./routes/index");
const bookRoutes = require('./routes/books')
const aboutRoutes = require('./routes/about')
const contactRoutes = require('./routes/contact')



// Initialize Server controller and export instance
const serverController = require("./controllers/serverController");
const server = express();
exports.server = server;

// Set port
const port = 5000;

// To parse json data
server.use(bodyParser.json());

// To parse URL encoded data
server.use(bodyParser.urlencoded({ extended: false }));

// View Engine Setup
server.set("views", path.join(__dirname, "./views"));
server.set("view engine", "ejs");
// render HTML files
server.engine("html", require("ejs").renderFile);

// Routes

// Index
server.use("/", indexRoutes.router);

// Books
server.use("/books", bookRoutes.router);

// William/About
server.use("/about", aboutRoutes.router);

// Contact
server.use("/contact", contactRoutes.router);

// Server is listening on port
server.listen(port, serverController.onServerStart(server, port));
