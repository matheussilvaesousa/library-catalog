const cardsContainer = document.getElementById("cards-container");
const body = document.querySelector("body");
const modal = document.getElementById("add-book-modal");
const blur = document.getElementById("blur");
const closeAddBook = document.getElementById("close-add-book");
const openAddBook = document.getElementById("open-add-book");

openAddBook.addEventListener("click", openModal);
closeAddBook.addEventListener("click", closeModal);

let myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.isFinished = function () {};
Book.prototype.addGenre = function () {};
Book.prototype.addPageCount = function () {};
Book.prototype.addOriginalLanguage = function () {};
Book.prototype.addPublicationYear = function () {};

function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author));
}

function displayAllBooks(booksArray) {
  booksArray.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card-wrapper");

    const cardText = document.createElement("div");
    cardText.classList.add("card-text-container");
    card.appendChild(cardText);

    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.textContent = book.title;
    cardText.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("card-author");
    author.textContent = book.author;
    cardText.appendChild(author);

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("more-info");
    moreInfo.textContent = "+";
    card.appendChild(moreInfo);

    cardsContainer.appendChild(card);
  });
}

function openModal() {
  modal.style.display = "flex";
  blur.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  blur.style.display = "none";
}

addBookToLibrary("1984", "George Orwell");
addBookToLibrary("Quincas Borba", "Machado de Assis");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee");
addBookToLibrary("Die Verwandlung", "Franz Kafka");

displayAllBooks(myLibrary);
