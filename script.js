let myLibrary = [];

function Book(name) { // Book constructor
    this.name = name;
}

function addBookToLibrary() {
    let name = prompt("Enter name of book:");
    if (name == null) {
        alert("Please enter a name.");
    }
    let object = new Book(name);
    myLibrary.push(object);
}

addBookToLibrary();
console.log(myLibrary);