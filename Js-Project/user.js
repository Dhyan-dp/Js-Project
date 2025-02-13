document.addEventListener("Domcontentloaded", function () {
    if (!localStorage.getItem("books")) {
        localStorage.setItem("books", JSON.stringify([]));
    }
    renderBooks();
});

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser"); // Remove user data from storage
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login
});

// Render books dynamically
function renderBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Apply search, filter, and sort
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const sortOption = document.getElementById("sortSelect").value;
    const filterOption = document.getElementById("filterSelect").value;

    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery)
    );

    if (filterOption === "available") {
        filteredBooks = filteredBooks.filter(book => book.availability);
    } else if (filterOption === "genre") {
        filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === searchQuery);
    } else if (filterOption === "publication_date") {
        filteredBooks = filteredBooks.filter(book => book.publicationDate.includes(searchQuery));
    }

    if (sortOption === "title") {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "genre") {
        filteredBooks.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (sortOption === "publication_date") {
        filteredBooks.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));
    }

    filteredBooks.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add(
            "bg-white", "rounded-lg", "shadow-md", "p-6", "m-4", "w-80", "flex", "flex-col", "justify-between"
        );
        bookCard.innerHTML = `
            <div>
                <h5 class="text-xl font-semibold mb-2">${book.title}</h5>
                <p class="text-gray-700 mb-1">Author: ${book.author}</p>
                <p class="text-gray-700 mb-1">Genre: ${book.genre}</p>
                <p class="text-gray-700 mb-1">Published: ${book.publicationDate}</p>
                <p class="text-gray-700 mb-4">Available: ${book.availability ? "Yes" : "No"}</p>
            </div>
            <div class="flex justify-between">
                <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onclick="borrowBook(${index})">Borrow</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onclick="returnBook(${index})">Return</button>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
}

// Borrow book function
function borrowBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    if (books[index].availability) {
        books[index].availability = false;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    } else {
        alert("Book is already borrowed.");
    }
}

// Return book function
function returnBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    if (!books[index].availability) {
        books[index].availability = true;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    } else {
        alert("Book is already available.");
    }
}

// Attach event listener to search, sort, and filter inputs
document.getElementById("searchInput").addEventListener("input", renderBooks);
document.getElementById("sortSelect").addEventListener("change", renderBooks);
document.getElementById("filterSelect").addEventListener("change", renderBooks);
