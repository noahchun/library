let myLibrary = [];

function Book(name, author, pages, read) { // Book constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read || false;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

Book.prototype.generateCardHTML = function() {
    const readStatus = this.read ? 'Yes' : 'No';
    return `
        <h3>${this.name}</h3>
        <p>Author: ${this.author}</p>
        <p>Pages: ${this.pages}</p>
        <p data-read-status>Read: ${readStatus}</p>
        <button class="read-button">Read</button>
        <button class="remove-button">Remove</button>
    `;
};

const addBookButton = document.querySelector('.addBookButton');

function addBookToLibrary() {
    let name = prompt("Enter name of book:");
    if (name == null) {
        alert("Please enter a name.");
    }
    let object = new Book(name);
    myLibrary.push(object);
}

//addBookButton.addEventListener('click', addBookToLibrary);  

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

const submitButton = document.querySelector('.submit-button');
const bookContainer = document.querySelector('.book-container');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const didRead = document.getElementById('checkbox').checked;

    const newBook = new Book(title, author, pages, didRead);
    myLibrary.push(newBook);

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = newBook.generateCardHTML();

    bookContainer.appendChild(card);

    const modal = document.querySelector('.modal');
    closeModal(modal);
});

bookContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-button')) {
        const card = event.target.closest('.card');
        if (card) {
            bookContainer.removeChild(card);
        }
    }
    if (event.target.classList.contains('read-button')) {
        const card = event.target.closest('.card');
        if (card) {
            const bookIndex = Array.from(bookContainer.children).indexOf(card);
            if (bookIndex !== -1) {
                myLibrary[bookIndex].toggleReadStatus(); 
                const readStatus = card.querySelector('p[data-read-status]');
                readStatus.textContent = `Read: ${myLibrary[bookIndex].read ? 'Yes' : 'No'}`;
            }
        }
    }
});

console.log(myLibrary);