const express = require("express");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const readAndAppend = require("./helpers/fsUtils");

const PORT = process.env.PORT || 3001;
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

app.get("/api/notes", (req, res) => {
	try {
		res.sendFile(path.join(__dirname, "db/db.json"));
	} catch (err) {
		res.json(err);
	}
});

app.post("/api/notes", async (req, res) => {
	try {
		const {title, content} = req.body;
		const note = {
			id: uuidv4(),
			title,
			content,
		};
		await readAndAppend(note, path.join(__dirname, "db/db.json"));
		res.send(note);
	} catch (err) {
		res.json(err);
	}
});

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});
