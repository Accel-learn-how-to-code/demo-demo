// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  users: []
}).write();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "pug");
app.set("views", "");

app.get("/", function(req, res) {
  res.render("index", {
    name: "Accel"
  });
});
app.get("/users", function(req, res) {
  res.render("index2", {
    users: db.get("users").value()
  });
});

app.get("/users/search", function(req, res) {
  var q = req.query.q;
  var usersList = db.get("users").value();
  var matchUsers = usersList.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("index2", {
    users: matchUsers
  });
});
app.get("/users/create", function(req, res) {
  res.render("create");
});

app.post("/users/create", function(req, res) {
  db.get('users')
        .push(req.body)
        .write();
  res.redirect("/users");
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
