const fs = require("fs").promises;

const readAndAppend = async (content, file) => {
	try {
		const data = await fs.readFile(file, "utf-8");
		let parsedData;
		try {
			parsedData = await JSON.parse(data);
		} catch (parseErr) {
			console.error("Error parsing JSON data:", parseErr);
			return;
		}
		await parsedData.push(content);
		await fs.writeFile(file, JSON.stringify(parsedData, null, 4));
		console.log("Content was appended successfully");
	} catch (err) {
		console.error("File operation error:", err);
	}
};

const updateEntry = async (content, file, id) => {
	try {
		const data = await fs.readFile(file, "utf-8");
		let parsedData;
		try {
			notes = await JSON.parse(data);
		} catch (parseErr) {
			console.error("Error parsing JSON data:", parseErr);
			return;
		}

		let noteUpdated = false;
		notes = notes.map((note) => {
			if (note.id === id) {
				noteUpdated = true;
				return content;
			}
			return note;
		});
		await fs.writeFile(file, JSON.stringify(notes, null, 4), "utf-8");
	} catch (err) {
		console.error(err);
	}
};

module.exports = {readAndAppend, updateEntry};
