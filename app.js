require("dotenv").config();

const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Required to parse requests
app.use(express.static("static"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  res.send(`<h1>Thanks for suscribing, ${firstName}!</h1>
  <p>Every week we'll send our news to: ${email}!</p>`);
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
