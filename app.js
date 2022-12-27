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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const listID = process.env.EMAIL_LIST_ID;
  const apiKey = process.env.EMAIL_API_KEY;

  const rootURL = process.env.EMAIL_ROOT_URL;
  const path = `/lists/${listID}/members/${email}`;
  const finalURL = rootURL + path;
  console.log(finalURL);

  const options = {
    method: "PUT",
    auth: `myApiBot:${apiKey}`,
  };

  const body = {
    email_address: email,
    status_if_new: "subscribed",
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  const request = https.request(finalURL, options, function (response) {
    response
      .on("data", function (data) {
        console.log(JSON.parse(data));
      })
      .on("error", (e) => {
        console.error(e);
      });

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(JSON.stringify(body));
  request.end();
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
