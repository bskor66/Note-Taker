document.addEventListener("DOMContentLoaded", function () {
	const sidebar = document.getElementById("sidebar");
	const noteContentArea = document.getElementById("noteContent");
	let currentNoteId = null;

	function displayDefaultHeading() {
		noteContentArea.innerHTML = "<h3>Select a Note to Get Started</h3>";
	}

	displayDefaultHeading();

	function createEditableFields(note) {
		noteContentArea.innerHTML = `
					<input type="text" value="${note.title}" class="form-control mb-2" id="editNoteTitle" placeholder="Note Title">
					<textarea class="form-control mb-2" rows="10" id="editNoteContent" placeholder="Note Content">${note.content}</textarea>
					<button id="saveNoteBtn" class="btn btn-primary">Save</button>
			`;
		document.getElementById("saveNoteBtn").addEventListener("click", saveNote);
	}

	function loadNotes() {
		fetch("/api/notes")
			.then((response) => response.json())
			.then((notes) => {
				sidebar.innerHTML = "";
				notes.forEach((note) => {
					const btn = document.createElement("button");
					btn.classList.add("btn", "btn-outline-primary", "w-100", "my-1");
					btn.textContent = note.title;
					btn.onclick = () => {
						currentNoteId = note.id;
						createEditableFields(note);
					};
					sidebar.appendChild(btn);
				});
			})
			.catch((error) => console.error("Error loading notes:", error));
	}

	loadNotes();

	document
		.getElementById("newNoteForm")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			const title = document.getElementById("newNoteTitle").value;
			const content = document.getElementById("newNoteContent").value;
			fetch("/api/notes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({title, content}),
			})
				.then((response) => response.json())
				.then((data) => {
					loadNotes();
					const newNoteModal = bootstrap.Modal.getInstance(
						document.getElementById("newNoteModal")
					);
					newNoteModal.hide();
					document.getElementById("newNoteForm").reset();
				})
				.catch((error) => {
					console.error("Error adding note:", error);
				});
		});

	function saveNote() {
		const updatedTitle = document.getElementById("editNoteTitle").value;
		const updatedContent = document.getElementById("editNoteContent").value;
		fetch(`/api/notes/${currentNoteId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: updatedTitle,
				content: updatedContent,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok " + response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				loadNotes();
			})
			.catch((error) => {
				console.error("Error updating note:", error);
			});
	}
});
