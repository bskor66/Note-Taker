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

module.exports = readAndAppend;
