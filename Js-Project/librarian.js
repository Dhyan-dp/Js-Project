document.getElementById("logout-btn").addEventListener("click", function () {
    
    alert("Logged out successfully!");
    window.location.href = "index.html"; 
});

let books = JSON.parse(localStorage.getItem("books")) || [];

function loadBooks() {
    const bookList = document.getElementById("books");
    bookList.innerHTML = "";
    
    books.forEach((book, index) => {
        const li = document.createElement("li");
        li.className = "flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-lg border border-gray-300 my-4";

        // Book details
        const bookDetails = document.createElement("div");
        bookDetails.className = "text-center sm:text-left";
        bookDetails.innerHTML = `
            <p class="text-lg font-semibold text-gray-800">${book.title}</p>
            <p class="text-sm text-gray-600">by ${book.author}</p>
            <p class="text-xs text-gray-500">Genre: ${book.genre} | Published: ${book.publicationDate}</p>
        `;

        // Button container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "mt-3 sm:mt-0 flex space-x-2";

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.className = "bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all";
        deleteBtn.onclick = () => removeBook(index);

        // Update button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.className = "bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all";
        updateBtn.onclick = () => updateBook(index);

        buttonContainer.appendChild(updateBtn);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(bookDetails);
        li.appendChild(buttonContainer);
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