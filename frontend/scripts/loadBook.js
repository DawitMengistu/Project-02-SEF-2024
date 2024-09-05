const bookListCon = document.querySelector(".book-list-con");
const bookFrame = document.querySelector(".book-frame")

let bookList = {};

async function getBookList() {
    await fetch('http://localhost:3000/booklist')
        .then(response => response.json())
        .then(data => {
            bookList = data;
            console.log(bookList)
        })
        .catch(error => console.error(error));

}
addBookListNav();

async function addBookListNav() {
    await getBookList();

    // Loop through each grade in the bookList
    for (let grade in bookList) {

        // Loop through subjects in each grade
        const subjects = bookList[grade];
        for (let subject in subjects) {
            console.log(`  Subject: ${subject}`);

            // Check if the subject has a books array
            if (subjects[subject].books) {
                subjects[subject].books.forEach(book => {
                    bookListCon.innerHTML += `
                    <a class="btn btn-primary rounded-0 my-2" data-bs-toggle="collapse" href="#${grade}"
                    role="button" aria-expanded="false" aria-controls="${grade}">${grade}</a>

                <div class="collapse multi-collapse" id="${grade}">
                    <div class="card card-body m-1 p-1">
                        <button class="btn btn-primary rounded-0 my-2 load-book-btn" id="/${grade}/${subject}/${book}" type="button" aria-expanded="false" ">
                         <span class="spinner-grow spinner-grow-sm pdf-load-spin d-none" aria-hidden="true"></span>
                          <span role="status">${subject}</span>
                      
                        </button>
                  
                    </div>
                </div>`
                });
            }
        }
    }

    addEventListenerToBooks();

}
function addEventListenerToBooks() {
    const bookBtns = document.querySelectorAll(".load-book-btn");
    const spinners = document.querySelectorAll(".pdf");

    bookBtns.forEach(singleBookBtn => {
        singleBookBtn.addEventListener("click", () => {
            console.log(singleBookBtn.id)
            bookFrame.src = "http://localhost:3000" + singleBookBtn.id;
        })
    });
}