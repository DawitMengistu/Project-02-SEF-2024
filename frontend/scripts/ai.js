const notesBtn = document.querySelector(".notes-nav-btn");
const aiNavBtn = document.querySelector(".ai-nav-btn");

const aiCon = document.querySelector(".chat-ai-con")
const noteCon = document.querySelector(".note-con")

const sendAiBtn = document.querySelector(".send-ai ")

const sendAiText = document.querySelector(".ai-send-text");
const loadingAi = document.querySelector(".loading-ai")

const inputAi = document.querySelector(".input-for-ai");

const resCon = document.querySelector(".response-con");


notesBtn.addEventListener("click", () => {
    addNote();

});


aiNavBtn.addEventListener("click", () => {
    addAi();
});


sendAiBtn.addEventListener("click", () => {
    resCon.innerHTML += `    <div class="human-question-con">
                                ${inputAi.value}
                            </div>`


    sendAiText.classList.add("hide")
    loadingAi.classList.remove("hide")
    let inputToSend = inputAi.value;
    inputAi.value = "";

    fetch('http://localhost:3000/assistance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: inputToSend,
        })
    })
        .then(response => response.json())
        .then(data => {
            sendAiText.classList.remove("hide")
            loadingAi.classList.add("hide")

            if (data.message == "success")
                resCon.innerHTML += `    <div class="ai-res-con">
            ${data.response}
        </div>`

        resCon.scrollTop = resCon.scrollHeight;
        })
        .catch(error => console.error(error));

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