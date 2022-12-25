require("dotenv").config();

const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Required to parse requests

const port = 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
