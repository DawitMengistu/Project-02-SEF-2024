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

    for (const grade in bookList) {
        // Create collapsible structure for each grade
        let gradeHTML = `
          <a class="btn btn-primary rounded-0 my-2" data-bs-toggle="collapse" href="#${grade}" role="button" aria-expanded="false" aria-controls="${grade}">${grade}</a>
          <div class="collapse multi-collapse" id="${grade}">
        `;

        for (const subject in bookList[grade]) {
            // Create button for each subject's book
            let books = bookList[grade][subject]["books"];
            books.forEach((book) => {
                gradeHTML += `
              <div class="card card-body m-1 p-1">
                <button class="btn btn-primary rounded-0 my-2 load-book-btn" id="/${grade}/${subject}/${book}" type="button" aria-expanded="false">
                  <span class="spinner-grow spinner-grow-sm pdf-load-spin d-none" aria-hidden="true"></span>
                  <span role="status">${subject}</span>
                </button>
              </div>`;
            });
        }

        gradeHTML += `</div>`;
        // Append the HTML to the container
        bookListCon.insertAdjacentHTML('beforeend', gradeHTML);
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