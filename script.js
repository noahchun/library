let myLibrary = [];

function Book(name) { // Book constructor
    this.name = name;
}

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

const submitButton = documnent.querySelector('.submit-button');


console.log(myLibrary);