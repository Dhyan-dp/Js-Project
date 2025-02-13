let books = JSON.parse(localStorage.getItem("books")) || [];

console.log(localStorage.getItem("books")); // Debugging line

function loadBooks() {
    const bookList = document.getElementById("books");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const li = document.createElement("li");
        li.textContent =` ${book.title} by ${book.author} (Genre: ${book.genre}, Published: ${book.publicationDate});
`
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.onclick = () => removeBook(index);

        // Update button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.onclick = () => updateBook(index);

        li.appendChild(deleteBtn);
        li.appendChild(updateBtn);
        bookList.appendChild(li);
    });
}

function addBook() {
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const genre = document.getElementById("book-genre").value.trim();
    const publicationDate = document.getElementById("book-date").value;

    if (!title || !author || !genre || !publicationDate) {
        alert("Please fill in all fields.");
        return;
    }

    const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        publicationDate,
        availability: true,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    console.log(localStorage.getItem("books")); // Debugging line
    loadBooks();
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-genre").value = "";
    document.getElementById("book-date").value = "";
}

function removeBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    console.log(localStorage.getItem("books")); // Debugging line
    loadBooks();
}

function checkRole(role) {
    const userRole = localStorage.getItem("role");
    if (userRole !== role) {
        alert("Access Denied!");
        window.location.href = "login.html";
    }
    
}

function logout() {
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

function updateBook(index) {
    const book = books[index];

    // Prompt the user for updated details
    const newTitle = prompt("Enter new title:", book.title);
    const newAuthor = prompt("Enter new author:", book.author);
    const newGenre = prompt("Enter new genre:", book.genre);
    const newPublicationDate = prompt("Enter new publication date:", book.publicationDate);

    // Ensure values are not empty and update the book
    if (newTitle && newAuthor && newGenre && newPublicationDate) {
        books[index] = {
            ...book, // Keep existing properties
            title: newTitle,
            author: newAuthor,
            genre: newGenre,
            publicationDate: newPublicationDate
        };

        // Update Local Storage
        localStorage.setItem("books", JSON.stringify(books));
        console.log(localStorage.getItem("books")); // Debugging line

        // Reload books list
        loadBooks();
        alert("Book updated successfully!");
    } else {
        alert("Update canceled or invalid input!");
    }
}

window.onload = loadBooks;