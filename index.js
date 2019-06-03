/* eslint-disable no-console */
const express = require("express");
const teams = require("./teams.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const team1 = require("./team1.json");
const team2 = require("./team2.json");
const matches = require("./matches.json");
const defaultPort = process.env.NODE_ENV === "development" ? 3005 : 80;
const port = process.env.port || process.env.PORT || defaultPort;

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const options = {
  origin: ["*"]
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.static("docs"));
app.get("/api/teams", (req, res) => {
  res.json(teams);
});

app.get("/api/teams/1", (req, res) => {
  res.json(team1);
});

app.get("/api/teams/2", (req, res) => {
  res.json(team2);
});

app.get("/api/matches", (req, res) => {
  res.json(matches);
});

app.get("/api/matches/:id", (req, res) => {
  res.json(matches.filter(m => `${m.id}` === req.params.id)[0]);
});

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }
  console.info(
    `🌎 Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`
  );
});
