let cardsContainer = document.getElementById("cards-container");
const addBookForm = document.getElementById("add-book-form");
const editForm = document.getElementById("edit-form");
const body = document.querySelector("body");
const modal = document.getElementById("add-book-modal");
const editModal = document.getElementById("edit");
const detail = document.getElementById("detail");
const detailHeaderTitle = document.getElementById("header-title-value");
const detailTitle = document.getElementById("title-value");
const detailAuthor = document.getElementById("author-value");
const detailPages = document.getElementById("pages-value");
const detailIsFinished = document.getElementById("is-finished-value");
const blur = document.getElementById("blur");
const closeAddBook = document.getElementById("close-add-book");
const openAddBook = document.getElementById("open-add-book");
const closeDetailButton = document.getElementById("detail-close");

openAddBook.addEventListener("click", openModal);
closeAddBook.addEventListener("click", closeModal);
addBookForm.addEventListener("submit", handleSubmitBook);
editForm.addEventListener("submit", handleSubmitEdit);
closeDetailButton.addEventListener("click", closeDetail);

let myLibrary = [];

function Book(title, author, pages, isFinished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isFinished = isFinished;
}

Book.prototype.editPages = function (pages) {
  this.pages = pages;
};

Book.prototype.editIsFinished = function (isFinished) {
  this.isFinished = isFinished;
};

function addBookToLibrary(title, author, pages = null, isFinished = false) {
  myLibrary.push(new Book(title, author, pages, isFinished));
}

function editBook(event) {
  const form = event.target.parentElement.parentElement;
  const targetIndex = form.dataset.index;
  openEditModal(targetIndex);
}

function deleteBook(event) {
  const targetIndex = event.target.parentElement.parentElement.dataset.index;
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

  const cards = Array.from(document.querySelectorAll(".card-wrapper"));
  cards.forEach((card) => {
    card.addEventListener("click", openDetail);
  });

  const editButtons = Array.from(document.querySelectorAll(".more-info"));
  editButtons.forEach((button) => {
    button.addEventListener("click", editBook);
  });

  const closeEditModalButton = document.getElementById("edit-close");
  closeEditModalButton.addEventListener("click", closeEditModal);

  const deleteButtons = Array.from(document.querySelectorAll(".delete-book"));
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function openEditModal(targetIndex) {
  editForm.dataset.index = targetIndex;
  editModal.style.display = "flex";
}

function closeEditModal() {
  editModal.style.display = "none";
}

function openDetail(event) {
  if (event.target.parentElement.classList.contains("book-settings")) {
    return;
  }
  const card = event.target.closest(".card-wrapper");
  const targetIndex = card.dataset.index;
  detailHeaderTitle.textContent = myLibrary[targetIndex].title;
  detailTitle.textContent = myLibrary[targetIndex].title;
  detailAuthor.textContent = myLibrary[targetIndex].author;
  detailPages.textContent = myLibrary[targetIndex].pages;
  detailIsFinished.textContent = myLibrary[targetIndex].isFinished
    ? "yes"
    : "no";
  detail.style.display = "flex";
}

function closeDetail() {
  detail.style.display = "none";
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
  closeModal();
}

function handleSubmitEdit(event) {
  event.preventDefault();
  const form = event.target;
  const newPages = form[0].value;
  const newIsFinished = form[1].checked;
  const index = form.dataset.index;
  myLibrary[index].editPages(newPages);
  myLibrary[index].editIsFinished(newIsFinished);
  displayAllBooks(myLibrary);
  closeEditModal();
}

addBookToLibrary("1984", "George Orwell", 233, true);
addBookToLibrary("Quincas Borba", "Machado de Assis");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", true);
addBookToLibrary("Die Verwandlung", "Franz Kafka");

displayAllBooks(myLibrary);
