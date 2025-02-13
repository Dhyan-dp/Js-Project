// Logout Functionality
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser"); // Remove user data from storage
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login
});

// Manage Users Section Toggle
document.getElementById("manage-users-btn").addEventListener("click", function () {
    document.getElementById("user-management").classList.toggle("hidden");
    loadUsers();
});

document.querySelector('.librarian').addEventListener("click",()=>{
  
    window.location.href="librarian.html";
});


// Function to load users from localStorage and display them
function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Clear existing list

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${user.name}</td>
            <td class="border border-gray-300 px-4 py-2">${user.email}</td>
            <td class="border border-gray-300 px-4 py-2">${user.role}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <button onclick="approveUser(${index})" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Approve</button>
                <button onclick="updateUser(${index})" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Update</button>
                <button onclick="deleteUser(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

// Approve User
function approveUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    alert(`${users[index].name} has been approved.`);
}

// Update User
function updateUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newName = prompt("Enter new name:", users[index].name);
    const newRole = prompt("Enter new role (Library member / Librarian / Admin):", users[index].role);

    if (newName && newRole) {
        users[index].name = newName;
        users[index].role = newRole;
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
        alert("User updated successfully!");
    }
}

// Delete User
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (confirm(`Are you sure you want to remove ${users[index].name}?`)) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
        alert("User removed successfully!");
    }
}

// Add New User
function addUser() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const name = prompt("Enter user name:");
    const email = prompt("Enter user email:");
    const role = prompt("Enter user role (Library member / Librarian / Admin):");

    if (name && email && role) {
        users.push({ name, email, role });
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
        alert("New user added successfully!");
    } else {
        alert("All fields are required!");
    }
}

// Add "Add User" Button to the UI
const addUserBtn = document.createElement("button");
addUserBtn.textContent = "Add New User";
addUserBtn.className = "bg-yellow-500 text-white px-4 py-2 rounded-md mt-3 hover:bg-yellow-600";
addUserBtn.addEventListener("click", addUser);
document.getElementById("user-management").appendChild(addUserBtn);

// Load users immediately when the script runs
loadUsers();
