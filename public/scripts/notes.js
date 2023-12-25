document.addEventListener("DOMContentLoaded", function () {
	const sidebar = document.getElementById("sidebar");
	const noteContent = document.getElementById("noteContent");

	fetch("/api/notes")
		.then((response) => response.json())
		.then((notes) => {
			notes.forEach((note) => {
				const btn = document.createElement("button");
				btn.classList.add("btn", "btn-outline-primary", "w-100", "my-1");
				btn.textContent = note.title;
				btn.onclick = () => displayNote(note);
				sidebar.appendChild(btn);
			});
		})
		.catch((error) => console.error("Error fetching notes:", error));

	function displayNote(note) {
		noteContent.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
	}

	document
		.getElementById("newNoteForm")
		.addEventListener("submit", function (event) {
			event.preventDefault();

			const title = document.getElementById("noteTitle").value;
			const content = document.getElementById("noteContent").value;

			const noteData = {
				title: title,
				content: content,
			};

			fetch("/api/notes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(noteData),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);
					bootstrap.Modal.getInstance(
						document.getElementById("newNoteModal")
					).hide();
					document.getElementById("newNoteForm").reset();
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
});
