let cardsContainer = document.getElementById("cards-container");
const addBookForm = document.getElementById("add-book-form");
const body = document.querySelector("body");
const modal = document.getElementById("add-book-modal");
const blur = document.getElementById("blur");
const closeAddBook = document.getElementById("close-add-book");
const openAddBook = document.getElementById("open-add-book");
let deleteBookButtons = [];

openAddBook.addEventListener("click", openModal);
closeAddBook.addEventListener("click", closeModal);
addBookForm.addEventListener("submit", handleSubmitBook);

let myLibrary = [];

function Book(title, author, pages, isFinished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isFinished = isFinished;
}

function addBookToLibrary(title, author, pages = null, isFinished = false) {
  myLibrary.push(new Book(title, author, pages, isFinished));
}

function deleteBook(event) {
  const targetIndex = event.target.parentElement.parentElement.dataset.index;
  // const cards = Array.from(document.querySelectorAll(".card-wrapper"));
  // const matchingCard = cards.filter((card) => {
  //   return targetIndex === card.dataset.index;
  // });
  // matchingCard[0].remove();
  myLibrary.splice(targetIndex, 1);
  displayAllBooks(myLibrary);
}

function displayAllBooks(booksArray) {
  cardsContainer.innerHTML = "";
  booksArray.forEach((book, index) => {
    const card = document.createElement("div");
    card.setAttribute("data-index", index);
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

    const bookSettings = document.createElement("div");
    bookSettings.classList.add("book-settings");
    card.appendChild(bookSettings);

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("more-info");
    bookSettings.appendChild(moreInfo);

    const deleteBook = document.createElement("div");
    deleteBook.classList.add("delete-book");
    bookSettings.appendChild(deleteBook);

    cardsContainer.appendChild(card);
  });
  const deleteButtons = Array.from(document.querySelectorAll(".delete-book"));
  console.log(deleteButtons);
  deleteButtons.forEach((button) =>
    button.addEventListener("click", deleteBook)
  );
}

function openModal() {
  modal.style.display = "flex";
  blur.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  blur.style.display = "none";
}

function handleSubmitBook(event) {
  event.preventDefault();
  const form = event.target;
  const title = form[0].value;
  const author = form[1].value;
  const pages = form[2].value;
  const isFinished = form[3].checked;
  addBookToLibrary(title, author, pages, isFinished);
  displayAllBooks(myLibrary);
}

addBookToLibrary("1984", "George Orwell", 233, true);
addBookToLibrary("Quincas Borba", "Machado de Assis");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", true);
addBookToLibrary("Die Verwandlung", "Franz Kafka");

displayAllBooks(myLibrary);
