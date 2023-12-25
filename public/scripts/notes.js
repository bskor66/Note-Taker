document.addEventListener("DOMContentLoaded", function () {
	const sidebar = document.getElementById("sidebar");
	const editNoteTitle = document.getElementById("editNoteTitle");
	const editNoteContent = document.getElementById("editNoteContent");
	const noteContentArea = document.getElementById("noteContent");

	function displayDefaultHeading() {
		noteContentArea.innerHTML = "<h3>Select a Note to Get Started</h3>";
	}

	displayDefaultHeading();

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
						editNoteTitle.value = note.title;
						editNoteContent.value = note.content;

						noteContentArea.innerHTML = `
													<input type="text" value="${note.title}" id="editNoteTitle" class="form-control mb-2" placeholder="Note Title">
													<textarea id="editNoteContent" class="form-control mb-2" rows="10" placeholder="Note Content">${note.content}</textarea>
													<button id="saveNoteBtn" class="btn btn-primary">Save</button>
											`;
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
					console.log("Note added:", data);
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
});
