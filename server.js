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
app.use(express.static("public"));

app.get("/api/notes", function(req, res) {
  let notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  console.log(notes);
  res.json(notes);
});
app.post("/api/notes", function(req, res) {
  const note = req.body;
  let notes = fs.readFileSync("./db/db.json", "utf8");
  notes = JSON.parse(notes);
  notes.push(note);
  const jsonNotes = JSON.stringify(notes);
  fs.writeFileSync("db/db.json", jsonNotes);
  res.json(note);
});
// Renders page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// listens to port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
