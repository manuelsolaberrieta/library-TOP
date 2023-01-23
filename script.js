class Library {
  books = [];
  bookSection = document.querySelector(".books");

  showBookForm() {
    const popUp = document.querySelector(".pop-up");
    popUp.style.visibility = "visible";
  }
  closeBookForm() {
    const popUp = document.querySelector(".pop-up");
    popUp.style.visibility = "hidden";
  }
  cleanBookForm() {
    const formInputs = document.querySelectorAll("div.input-and-label > input");
    Array.from(formInputs).map((key) => (key.value = ""));
  }
  getBookInfo() {
    const inputNodeList = document.querySelectorAll(
      "div.input-and-label > input"
    );
    const bookInfo = Array.from(inputNodeList).map((key) => key.value);
    this.createBook(bookInfo);
  }
  getCheckboxVal() {
    const value = document.querySelector("input[type='checkbox']").checked;
    return value;
  }
  createBook(bookInfo) {
    const book = new Book(
      bookInfo[0],
      bookInfo[1],
      bookInfo[2],
      this.getCheckboxVal()
    );
    this.saveBook(book);
  }
  saveBook(book) {
    this.books.push(book);
    this.createBookElements();
    this.cleanBookForm();
    this.closeBookForm();
  }
  setRead(i, btn) {
    if (this.books[i].read === "Read") {
      this.books[i].read = "Not read";
      btn.classList.remove("read-yes");
      btn.classList.add("read-no");
    } else {
      this.books[i].read = "Read";
      btn.classList.remove("read-no");
      btn.classList.add("read-yes");
    }
    this.createBookElements();
  }
  createReadButton(readOrNot) {
    const readButton = document.createElement("button");
    readButton.className = readOrNot === "Read" ? "read" : "not-read";
    readButton.textContent = "Read";
    readButton.addEventListener("click", (e) => {
      this.setRead(e.target.parentNode.parentNode.id, readButton);
    });
    return readButton;
  }
  createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      this.deleteBook(e.target.parentNode.parentNode.id);
    });
    return deleteButton;
  }
  createButtoner(readOrNot) {
    const buttoner = document.createElement("div");
    buttoner.className = "buttoner";
    buttoner.append(
      this.createReadButton(readOrNot),
      this.createDeleteButton()
    );
    return buttoner;
  }
  createBookElements() {
    this.bookSection.replaceChildren();
    this.books.forEach((bookToShow) => {
      const bookElement = document.createElement("div");
      bookElement.innerHTML = `<h1>${bookToShow.name}</h1>by<h3>${bookToShow.author}</h3><h5>${bookToShow.pages} pages</h5><h6>${bookToShow.read}</h6>`;
      bookElement.className = "book";
      bookElement.id = this.books.indexOf(bookToShow);
      bookElement.appendChild(this.createButtoner(bookToShow.read));
      this.bookSection.appendChild(bookElement);
    });
  }
  deleteBook(i) {
    this.books.splice(i, 1);
    this.createBookElements();
  }
}
class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = this.setRead(read);
  }
  setRead(read) {
    if (read === false) {
      return "Not read";
    } else {
      return "Read";
    }
  }
}
const lib = new Library();
document.querySelector(".save").addEventListener("click", (event) => {
  lib.getBookInfo();
  event.preventDefault();
});
document.querySelector(".showForm").addEventListener("click", () => {
  lib.showBookForm();
});
document.querySelector(".closePopUp").addEventListener("click", () => {
  lib.closeBookForm();
});
