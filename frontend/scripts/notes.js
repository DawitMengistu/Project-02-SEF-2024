const saveBtn = document.querySelector(".save-note-btn");
const saveText = document.querySelector(".save-text");
const loading = document.querySelector(".loading");

const title = document.querySelector(".note-tittle");
const note = document.querySelector(".note-input");

let dropdownMenu = document.querySelector(".dropdown-menu");

let notes;

saveBtn.addEventListener("click", () => {
    saveText.classList.add("hide");
    loading.classList.remove("hide");

    console.log()
    fetch('http://localhost:3000/savenotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: { note_title: title.value, note: note.value },
        })
    })
        .then(response => response.json())
        .then(data => {

            saveText.classList.remove("hide");
            loading.classList.add("hide");

            alert(data.message)
        }
        )
        .catch(error => console.error(error));

})
getNotes();

async function getNotes() {
    await fetch('http://localhost:3000/notes')
        .then(response => response.json())
        .then(data => {
            notes = data;

            data.forEach(singleNote => {
                dropdownMenu.innerHTML += `<li><a class="dropdown-item" >${singleNote.title}</a></li>`
            });
            eventListenerForLoadNotes();
        })
        .catch(error => console.error(error));
}


function eventListenerForLoadNotes() {
    const loadNotes = document.querySelectorAll(".dropdown-item");

    for (let i = 0; i < loadNotes.length; i++) {

        loadNotes[i].addEventListener("click", () => {
            title.value = notes[i].title
            note.value = notes[i].note;
            
        });
    }
}