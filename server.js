const express = require("express");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const {readAndAppend, updateEntry} = require("./helpers/fsUtils");

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

app.put("/api/notes/:id", async (req, res) => {
	try {
		const {title, content} = req.body;
		const {id} = req.params;

		const note = {
			id,
			title,
			content,
		};

		await updateEntry(note, path.join(__dirname, "db/db.json"), id);
		res.json(note);
	} catch (err) {
		res.json(err);
	}
});

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});
