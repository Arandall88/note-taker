// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Require Express
const app = express();
global.id = 0;
// Port to Run Heroku localhost
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
function getNotes(){
  let notes = fs.readFileSync("./db/db.json", "utf8");
  try {
    notes = JSON.parse(notes);
  }catch(err){
    notes =[];
  }
  return notes;
}
app.get("/api/notes", function(req, res) {
  let notes = getNotes();
  
  console.log(notes);
  res.json(notes);
});
app.post("/api/notes", function(req, res) {
  const note = req.body;
  const title = note.title;
  const text = note.text;
  const newNote = {title, text, id: ++global.id}
  let notes = getNotes();
  notes.push(newNote);
  const jsonNotes = JSON.stringify(notes);
  fs.writeFileSync("db/db.json", jsonNotes);
  res.json(note);
});
app.delete('/api/notes/:id', (req, res) => {
  
  let id = req.params.id;
  let notes = getNotes();
  let filteredNotes = notes.filter(note=> {
    return note.id !== parseInt(id);
  });

  const jsonNotes = JSON.stringify(filteredNotes);
  fs.writeFileSync("db/db.json", jsonNotes);
  res.json({"Ok":true});
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
