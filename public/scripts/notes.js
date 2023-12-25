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
});
