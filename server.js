const exp = require("constants");
const express = require("express");
const path = require("path");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/pages/notes.html"));
});
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
// WHEN I click on the Save button
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
// WHEN I click on the "New Note" button in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears

// The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

// The following HTML routes should be created:

// GET /notes should return the notes.html file.

// GET * should return the index.html file.

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});
