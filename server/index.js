const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const app = express();


app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/send-text", (req, res) => {
  const { recipient, message } = req.query;
  client.messages
    .create({
      body: `${message} was donated `,
      messagingServiceSid: process.env.MESSAGE_SERVICE_SID,
      to: "+91" + recipient,
      //  from: "+12184004665",
    })
    .then((message) => console.log(message.body))
    .done();
});

app.listen(4000, () => {
  console.log("Listening");
});
