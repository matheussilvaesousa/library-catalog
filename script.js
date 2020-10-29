let myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.addGenre = function () {};
Book.prototype.addPageCount = function () {};
Book.prototype.addOriginalLanguage = function () {};
Book.prototype.addPublicationDate = function () {};

function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author));
}

addBookToLibrary("1984", "George Orwell");
addBookToLibrary("1984", "George Orwell");
addBookToLibrary("1984", "George Orwell");

console.log(myLibrary);
