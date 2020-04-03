// Dependencies 
const express = require("express");
const path = require("path");
const fs = require("fs");

// Require Express
const app = express();

// Port to Run Heroku localhost
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
