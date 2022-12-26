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

  const client = require(process.env.EMAIL_ROOT_URL);

  client.setConfig({
    apiKey: process.env.EMAIL_API_KEY,
    server: process.env.EMAIL_SERVER_ID,
  });

  const runApiCall = async () => {
    const response = await client.lists.addListMember(
      process.env.EMAIL_LIST_ID,
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );
  };

  runApiCall();
});

const test = process.env.EMAIL_API_KEY;

const port = 3000;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
