const notesBtn = document.querySelector(".notes-nav-btn");
const aiNavBtn = document.querySelector(".ai-nav-btn");

const aiCon = document.querySelector(".chat-ai-con")
const noteCon = document.querySelector(".note-con")


notesBtn.addEventListener("click", () => {
    addNote();

});


aiNavBtn.addEventListener("click", () => {
    addAi();
})

function addNote() {
    notesBtn.classList.add("focused");
    aiNavBtn.classList.remove("focused");


    noteCon.classList.remove("hide");
    aiCon.classList.add("hide");
}

function addAi() {
    notesBtn.classList.remove("focused");
    aiNavBtn.classList.add("focused");


    noteCon.classList.add("hide");
    aiCon.classList.remove("hide");
}