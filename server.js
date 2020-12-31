"use strict";

require('dotenv').config();

const express = require("express");
const path = require("path");
const test = process.env.TEST;

// Init express
const server = express();

// Set port

const PORT = process.env.PORT || 5000;

// Create your endpoints/route handlers

// Set static folder

server.use(express.static(path.join(__dirname, "public")));

/* 
server.get('/', (req,res) => {
    res.sendFile(path.join(path.resolve(__dirname, '..'), 'site', 'index.html'));
}) */

// Listen on a port
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log(`${test}`)