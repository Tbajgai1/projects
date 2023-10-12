const addBtn = document.getElementById("add-note");
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach(note => {
        addNewNote(note);
    })
}


addBtn.addEventListener("click", () => {
	addNewNote();
});

function addNewNote(text= '') {
	const note = document.createElement("div");
	note.classList.add("notes");
	note.innerHTML = `
        <div class="tools">
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="main ${text ? "" : "hidden"}">
        </div>
        <textarea class = "${text ? "hidden" : ""}"></textarea>
    `;

	const editBtn = note.querySelector(".edit");
	const deleteBtn = note.querySelector(".delete");
	const main = note.querySelector(".main");
	const textArea = note.querySelector("textarea");
    textArea.value = text;
    main.innerHTML = marked(text);

	editBtn.addEventListener("click", () => {
		main.classList.toggle("hidden");
		textArea.classList.toggle("hidden");
	});

	deleteBtn.addEventListener("click", () => {
		note.remove();
	});

	textArea.addEventListener("input", (e) => {
		const { value } = e.target;
		main.innerHTML = marked(value);

        updateLS();
	});

	document.body.appendChild(note);
}


function updateLS() {
    const  notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach(note => {
        notes.push(note.value)
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

// TODO: In the begining have edit button as save button, and when saved have edit button, TOGGLE BETWEEN


